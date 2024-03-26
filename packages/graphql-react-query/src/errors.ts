import type { GraphQLError } from 'graphql';

export class FetchNetworkError extends Error {
  public name = 'FetchNetworkError' as const;
  public originalError: Error;
  constructor(message: string, { originalError }: { originalError: Error }) {
    super(message, { cause: originalError });
    this.originalError = originalError;
  }
}

export class FetchNetworkUnexpectedNonJsonPayload extends Error {
  public name = 'FetchNetworkUnexpectedNonJsonPayload' as const;
  public originalError: Error;
  public textBody: string | null;
  public response: Response;
  constructor(
    message: string,
    {
      originalError,
      textBody,
      response,
    }: {
      originalError: Error;
      textBody: string | null;
      response: Response;
    },
  ) {
    super(message, { cause: originalError });
    this.originalError = originalError;
    this.textBody = textBody;
    this.response = response;
  }
}

export class FetchNetworkUnexpectedPayloadShape extends Error {
  public name = 'FetchNetworkUnexpectedPayloadShape' as const;
  public originalError: Error;
  public body: unknown;
  public response: Response;
  constructor(
    message: string,
    {
      originalError,
      body,
      response,
    }: {
      originalError: Error;
      body: unknown;
      response: Response;
    },
  ) {
    super(message, { cause: originalError });
    this.originalError = originalError;
    this.body = body;
    this.response = response;
  }
}

export class MultipleGraphQLErrors extends Error {
  public name = 'MultipleGraphQLErrors' as const;
  public errors: readonly GraphQLError[];
  public query: string;
  public variables: Record<string, unknown> | undefined;
  constructor({
    errors,
    query,
    variables,
  }: {
    errors: typeof MultipleGraphQLErrors.prototype.errors;
    query: string;
    variables: typeof MultipleGraphQLErrors.prototype.variables;
  }) {
    super('Multiple GraphQL errors', { cause: errors.map(error => error.message).join('\n') });
    this.errors = errors;
    this.query = query;
    this.variables = variables;
  }
}

export class SingleGraphQLError extends Error {
  public name = 'SingleGraphQLError' as const;
  public error: GraphQLError;
  public query: string;
  public variables: Record<string, unknown> | undefined;
  constructor({
    error,
    query,
    variables,
  }: {
    error: typeof SingleGraphQLError.prototype.error;
    query: string;
    variables: typeof SingleGraphQLError.prototype.variables;
  }) {
    super('Single GraphQL error', { cause: error.message });
    this.error = error;
    this.query = query;
    this.variables = variables;
  }
}

export class UnexpectedMissingGraphQLData extends Error {
  public name = 'UnexpectedMissingGraphQLData' as const;
  public query: string;
  public variables: Record<string, unknown> | undefined;
  constructor({
    query,
    variables,
  }: {
    query: string;
    variables: typeof UnexpectedMissingGraphQLData.prototype.variables;
  }) {
    super('Unexpected missing GraphQL data');
    this.query = query;
    this.variables = variables;
  }
}
