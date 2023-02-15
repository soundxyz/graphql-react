declare const result: unique symbol;
declare const variables: unique symbol;

export type StringDocumentNode<
  Result extends Record<string, unknown> = Record<string, any>,
  Variables extends Record<string, unknown> = Record<string, any>,
> = { doc: string; [result]: Result; [variables]: Variables };

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
