import {
  DocumentNode,
  FragmentDefinitionNode,
  getOperationAST,
  OperationDefinitionNode,
  print,
  stripIgnoredCharacters,
} from 'graphql';
import { Kind } from 'graphql';

import { PluginFunction } from '@graphql-codegen/plugin-helpers';
import { optimizeDocuments } from '@graphql-tools/relay-operation-optimizer';
import { Source } from '@graphql-tools/utils';

export type OperationOrFragment = {
  initialName: string;
  definition: OperationDefinitionNode | FragmentDefinitionNode;
};

export type SourceWithOperations = {
  source: Source;
  operations: Array<OperationOrFragment>;
};

const OperationType = {
  QUERY: 'Query',
  MUTATION: 'Mutation',
  SUBSCRIPTION: 'Subscription',
} as const;

type OperationType = (typeof OperationType)[keyof typeof OperationType];

function getOperationType(documentNode: DocumentNode): OperationType | null {
  if (documentNode.definitions.length === 0) {
    return null;
  }

  const definition = documentNode.definitions[0];

  if (definition.kind !== Kind.OPERATION_DEFINITION) {
    return null;
  }

  switch (definition.operation) {
    case 'query':
      return OperationType.QUERY;
    case 'mutation':
      return OperationType.MUTATION;
    case 'subscription':
      return OperationType.SUBSCRIPTION;
    default:
      return null;
  }
}

function getFragmentDefinitions(documentNodes: DocumentNode[]): FragmentDefinitionNode[] {
  const fragmentDefinitions: FragmentDefinitionNode[] = [];

  for (const documentNode of documentNodes) {
    for (const definition of documentNode.definitions) {
      if (definition.kind === Kind.FRAGMENT_DEFINITION) {
        fragmentDefinitions.push(definition);
      }
    }
  }

  return fragmentDefinitions;
}

const importTypes = `import type * as Types from './types';\n`;
const importMasking = `import type { StringDocumentNode } from '@soundxyz/gql-string';\n`;

export const plugin: PluginFunction<{
  sourcesWithOperations: Array<SourceWithOperations>;
  useTypeImports?: boolean;
}> = async (schema, documents, { sourcesWithOperations }) => {
  const fragments = getFragmentDefinitions(
    documents.reduce((acc: DocumentNode[], value) => {
      if (!value.document) return acc;

      acc.push(value.document);

      return acc;
    }, []),
  );

  const filteredDocuments = sourcesWithOperations.reduce((acc: DocumentNode[], value) => {
    if (value.source.document) {
      acc.push(value.source.document);
    }
    return acc;
  }, []);

  const optimizedDocuments = optimizeDocuments(schema, filteredDocuments, {
    assumeValid: true,
  });

  return [
    importTypes,
    importMasking,
    ...fragments.map(value => {
      return `\nexport const ${value.name.value}FragmentDoc = "" as unknown as StringDocumentNode<Types.${value.name.value}Fragment, unknown>;`;
    }),
    ...optimizedDocuments.reduce((acc: string[], value) => {
      const ast = getOperationAST(value);

      if (!ast?.name) return acc;

      const type = getOperationType(value);

      if (!type) return acc;

      const astName = ast.name.value;

      acc.push(
        `\nexport const ${astName}Document = '${stripIgnoredCharacters(
          print(value),
        )}' as unknown as StringDocumentNode<Types.${astName}${type},Types.${astName}${type}Variables>;`,
      );
      return acc;
    }, []),
  ].join(`\n`);
};
