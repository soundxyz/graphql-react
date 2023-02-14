declare const result: unique symbol;
declare const variables: unique symbol;

export type StringDocumentNode<
  Result extends Record<string, unknown> = Record<string, any>,
  Variables extends Record<string, unknown> = Record<string, any>,
  Name extends string = string,
> = { doc: string; name: Name; [result]: Result; [variables]: Variables };

export declare type ResultOf<T> = T extends StringDocumentNode<
  infer ResultType,
  infer _VariablesType,
  infer _OperationName
>
  ? ResultType
  : never;

export declare type VariablesOf<T> = T extends StringDocumentNode<
  infer _ResultType,
  infer VariablesType,
  infer _OperationName
>
  ? VariablesType
  : never;

export declare type OperationNameOf<T> = T extends StringDocumentNode<
  infer _ResultType,
  infer _VariablesType,
  infer OperationName
>
  ? OperationName
  : never;
