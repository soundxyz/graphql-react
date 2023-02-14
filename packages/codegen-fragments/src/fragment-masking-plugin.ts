import type { PluginFunction } from '@graphql-codegen/plugin-helpers';

const fragmentTypeHelper = `
export type FragmentType<TDocumentType extends StringDocumentNode<any, any>> = TDocumentType extends StringDocumentNode<
  infer TType,
  any
>
  ? TType extends { ' $fragmentName'?: infer TKey }
    ? TKey extends string
      ? { ' $fragmentRefs'?: { [key in TKey]: TType } }
      : never
    : never
  : never;`;

const makeFragmentDataHelper = `export function makeFragmentData<F extends StringDocumentNode, FT extends ResultOf<F>>(
  data: DeepFragmentTypes<FT>,
  _fragment: F,
): FragmentType<F> {
  return data as FragmentType<F>;
}

/**
 * just want to fill types 1 level deep. Useful for mocking or testing.
 */
export function makeShallowFragmentData<F extends StringDocumentNode, FT extends ResultOf<F>>(
  data: FT,
  _fragment: F,
): FragmentType<F> {
  return data as FragmentType<F>;
}

export type DeepFragmentTypes<T> = T extends {
  ' $fragmentRefs'?: { [key: string]: infer TType };
}
  ? TType extends object
    ? T & DeepFragmentTypes<TType>
    : T
  : T;`;

const defaultUnmaskFunctionName = 'getFragment';

const modifyType = (
  rawType: string,
  opts: { nullable: boolean; list: 'with-list' | 'only-list' | false },
) =>
  `${
    opts.list === 'only-list'
      ? `ReadonlyArray<${rawType}>`
      : opts.list === 'with-list'
      ? `${rawType} | ReadonlyArray<${rawType}>`
      : rawType
  }${opts.nullable ? ' | null | undefined' : ''}`;

const createUnmaskFunctionTypeDefinition = (
  unmaskFunctionName = defaultUnmaskFunctionName,
  opts: { nullable: boolean; list: 'with-list' | 'only-list' | false },
) => `export function ${unmaskFunctionName}<TType>(
  _documentNode: StringDocumentNode<TType, any>,
  fragmentType: ${modifyType('FragmentType<StringDocumentNode<TType, any>>', opts)}
): ${modifyType('TType', opts)}`;

const createUnmaskFunctionTypeDefinitions = (unmaskFunctionName = defaultUnmaskFunctionName) => [
  `// return non-nullable if \`fragmentType\` is non-nullable\n${createUnmaskFunctionTypeDefinition(
    unmaskFunctionName,
    { nullable: false, list: false },
  )}`,
  `// return nullable if \`fragmentType\` is nullable\n${createUnmaskFunctionTypeDefinition(
    unmaskFunctionName,
    {
      nullable: true,
      list: false,
    },
  )}`,
  `// return array of non-nullable if \`fragmentType\` is array of non-nullable\n${createUnmaskFunctionTypeDefinition(
    unmaskFunctionName,
    { nullable: false, list: 'only-list' },
  )}`,
  `// return array of nullable if \`fragmentType\` is array of nullable\n${createUnmaskFunctionTypeDefinition(
    unmaskFunctionName,
    { nullable: true, list: 'only-list' },
  )}`,
];

const createUnmaskFunction = (unmaskFunctionName = defaultUnmaskFunctionName) => `
${createUnmaskFunctionTypeDefinitions(unmaskFunctionName)
  .concat(
    createUnmaskFunctionTypeDefinition(unmaskFunctionName, { nullable: true, list: 'with-list' }),
  )
  .join(';\n')} {
  return fragmentType as any;
}
`;

const documentNode = `import type { StringDocumentNode, ResultOf } from '@soundxyz/gql-string';
`;

/**
 * Plugin for generating fragment masking helper functions.
 */
export const plugin: PluginFunction<{
  useTypeImports?: boolean;
  augmentedModuleName?: string;
  unmaskFunctionName?: string;
}> = (_, __, { unmaskFunctionName }, _info) => {
  return [
    documentNode,
    `\n`,
    fragmentTypeHelper,
    `\n`,
    createUnmaskFunction(unmaskFunctionName),
    `\n`,
    makeFragmentDataHelper,
  ].join(``);
};
