import type { Types } from '@graphql-codegen/plugin-helpers';
import { processSources } from './process-sources';
import { ClientSideBaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import * as typescriptPlugin from '@graphql-codegen/typescript';
import * as typescriptOperationPlugin from '@graphql-codegen/typescript-operations';
import { join } from 'path';

export const preset: Types.OutputPreset<{}> = {
  async buildGeneratesSection(options) {
    const visitor = new ClientSideBaseVisitor(
      options.schemaAst!,
      [],
      options.config,
      options.config,
    );

    const sourcesWithOperations = processSources(options.documents, node => {
      if (node.kind === 'FragmentDefinition') {
        return visitor.getFragmentVariableName(node);
      }
      return visitor.getOperationVariableName(node);
    });
    const sources = sourcesWithOperations.map(({ source }) => source);

    const pluginMap = {
      ...options.pluginMap,

      [`typescript`]: typescriptPlugin,
      [`typescript-operations`]: typescriptOperationPlugin,
    };

    const plugins: Array<Types.ConfiguredPlugin> = [
      { [`typescript`]: {} },
      { [`typescript-operations`]: {} },
      ...options.plugins,
    ];

    return [
      {
        filename: join(options.baseOutputDir, 'types.ts'),
        config: {},
        documents: sources,
        pluginMap,
        plugins,
        schema: options.schema,
      },
    ];
  },
};
