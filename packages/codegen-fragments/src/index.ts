import type { CodegenPlugin, Types } from '@graphql-codegen/plugin-helpers';
import assert from 'assert';
import { parse, printSchema } from 'graphql';
import { join } from 'path';

import * as typescriptPlugin from '@graphql-codegen/typescript';
import * as typescriptOperationPlugin from '@graphql-codegen/typescript-operations';
import { ClientSideBaseVisitor } from '@graphql-codegen/visitor-plugin-common';

import * as fragmentMaskingPlugin from './fragment-masking-plugin';
import { processSources } from './process-sources';
import { processSchema } from './processSchema';
import * as gqlTagPlugin from './tags';

export const preset: Types.OutputPreset<{}> = {
  async buildGeneratesSection(options) {
    assert(options.schemaAst, 'Schema AST could not be found');

    const visitor = new ClientSideBaseVisitor(
      options.schemaAst,
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

    const tsPluginMap = {
      ...options.pluginMap,
      [`typescript`]: typescriptPlugin,
      [`typescript-operations`]: typescriptOperationPlugin,
    };

    const tsPlugins: Array<Types.ConfiguredPlugin> = [
      { [`typescript`]: {} },
      { [`typescript-operations`]: {} },
      ...options.plugins,
    ];

    const documentsPluginMap: Record<string, CodegenPlugin<any>> = {
      [`gen-dts`]: gqlTagPlugin,
    };

    const fragmentsPluginMap: Record<string, CodegenPlugin<any>> = {
      [`fragment-masking`]: fragmentMaskingPlugin,
    };

    const processedSchemaAst = processSchema(options.schemaAst);
    const processedSchema = parse(printSchema(processedSchemaAst));
    return [
      {
        filename: join(options.baseOutputDir, 'types.ts'),
        config: {
          ...options.config,
          inlineFragmentTypes: 'mask',
        },
        documents: sources,
        pluginMap: tsPluginMap,
        plugins: tsPlugins,
        schema: options.schema,
      },
      {
        filename: join(options.baseOutputDir, 'documents.ts'),
        config: {
          ...options.config,
          inlineFragmentTypes: 'mask',
        },
        documents: sources,
        pluginMap: documentsPluginMap,
        plugins: [{ [`gen-dts`]: { sourcesWithOperations } }],
        schema: processedSchema,
        schemaAst: processedSchemaAst,
      },
      {
        filename: join(options.baseOutputDir, 'fragment-masking.ts'),
        config: {
          ...options.config,
          inlineFragmentTypes: 'mask',
        },
        documents: sources,
        pluginMap: fragmentsPluginMap,
        plugins: [
          {
            [`fragment-masking`]: {},
          },
        ],
        schema: options.schema,
      },
    ];
  },
};
