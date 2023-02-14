import type { StringDocumentNode } from './documentNode';

export function gql<T extends StringDocumentNode>(doc: T): T;
export function gql<T extends TemplateStringsArray>(doc: T): T;
export function gql<T extends string>(doc: T): T;
export function gql<T extends TemplateStringsArray | string>(doc: T) {
  return doc;
}
