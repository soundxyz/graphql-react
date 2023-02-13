import { FragmentDefinitionNode, OperationDefinitionNode } from 'graphql';

import { OperationOrFragment, SourceWithOperations } from '@graphql-codegen/gql-tag-operations';
import { Source } from '@graphql-tools/utils';

export type BuildNameFunction = (type: OperationDefinitionNode | FragmentDefinitionNode) => string;

export function processSources(sources: Array<Source>, buildName: BuildNameFunction) {
  const sourcesWithOperations: Array<SourceWithOperations> = [];

  for (const source of sources) {
    const { document } = source;
    const operations: Array<OperationOrFragment> = [];

    for (const definition of document?.definitions ?? []) {
      if (definition?.kind !== `OperationDefinition` && definition?.kind !== 'FragmentDefinition')
        continue;

      if (definition.name?.kind !== `Name`) {
        if (definition?.kind === `OperationDefinition`) {
          // eslint-disable-next-line no-console
          console.warn(
            `[client-preset] the following anonymous operation is skipped: ${source.rawSDL}`,
          );
        }
        continue;
      }

      operations.push({
        initialName: buildName(definition),
        definition,
      });
    }

    if (operations.length === 0) continue;

    sourcesWithOperations.push({
      source,
      operations,
    });
  }

  return sourcesWithOperations;
}
