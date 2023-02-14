declare const result: unique symbol;
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


export type FragmentType<TDocumentType extends StringDocumentNode<any, any>> = TDocumentType extends StringDocumentNode<
  infer TType,
  any
>
  ? TType extends { ' $fragmentName'?: infer TKey }
    ? TKey extends string
      ? { ' $fragmentRefs'?: { [key in TKey]: TType } }
      : never
    : never
  : never;

// return non-nullable if `fragmentType` is non-nullable
export function getFragment<TType>(
  _documentNode: StringDocumentNode<TType, any>,
  fragmentType: FragmentType<StringDocumentNode<TType, any>>
): TType;
// return nullable if `fragmentType` is nullable
export function getFragment<TType>(
  _documentNode: StringDocumentNode<TType, any>,
  fragmentType: FragmentType<StringDocumentNode<TType, any>> | null | undefined
): TType | null | undefined;
// return array of non-nullable if `fragmentType` is array of non-nullable
export function getFragment<TType>(
  _documentNode: StringDocumentNode<TType, any>,
  fragmentType: ReadonlyArray<FragmentType<StringDocumentNode<TType, any>>>
): ReadonlyArray<TType>;
// return array of nullable if `fragmentType` is array of nullable
export function getFragment<TType>(
  _documentNode: StringDocumentNode<TType, any>,
  fragmentType: ReadonlyArray<FragmentType<StringDocumentNode<TType, any>>> | null | undefined
): ReadonlyArray<TType> | null | undefined;
export function getFragment<TType>(
  _documentNode: StringDocumentNode<TType, any>,
  fragmentType: FragmentType<StringDocumentNode<TType, any>> | ReadonlyArray<FragmentType<StringDocumentNode<TType, any>>> | null | undefined
): TType | ReadonlyArray<TType> | null | undefined {
  return fragmentType as any;
}

export function makeFragmentData<F extends StringDocumentNode, FT extends ResultOf<F>>(
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
  : T;