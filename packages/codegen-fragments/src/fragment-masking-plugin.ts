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

const makeFragmentDataHelper = `
export function makeFragmentData<
  F extends StringDocumentNode,
  FT extends ResultOf<F>
>(data: FT, _fragment: F): FragmentType<F> {
  return data as FragmentType<F>;
}`;

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

const documentNode = `declare const result: unique symbol;
declare const variables: unique symbol;

export type StringDocumentNode<
  Result = {
    [key: string]: any;
  },
  Variables = {
    [key: string]: any;
  },
> = string & { [result]: Result; [variables]: Variables };

export declare type ResultOf<T> = T extends StringDocumentNode<
  infer ResultType,
  infer _VariablesType
>
  ? ResultType
  : never;

export declare type VariablesOf<T> = T extends StringDocumentNode<
  infer _ResultType,
  infer VariablesType
>
  ? VariablesType
  : never;
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
