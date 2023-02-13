import type { Types } from '@graphql-codegen/plugin-helpers';
import { processSources } from './process-sources';
import { ClientSideBaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import * as typescriptPlugin from '@graphql-codegen/typescript';
import * as typescriptOperationPlugin from '@graphql-codegen/typescript-operations';
import { join } from 'path';
import { writeFile } from 'fs/promises';

const pendingDebug: unknown[] = [];
const debug = (msg: unknown) => {
  pendingDebug.push(msg);
};

export const preset: Types.OutputPreset<{}> = {
  async buildGeneratesSection(options) {
    pendingDebug.splice(0, pendingDebug.length);

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

    debug(sources);

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

    await writeFile('./debug.json', JSON.stringify(pendingDebug, null, 2), 'utf-8');

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
