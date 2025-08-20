/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetPostBySlug($slug: ID!) {\n  post(id: $slug, idType: SLUG) {\n    ...PostCardFields\n    content\n    author {\n      node {\n        name\n      }\n    }\n    categories {\n      nodes {\n        name\n      }\n    }\n    tags {\n      nodes {\n        slug\n        name\n      }\n    }\n  }\n}": typeof types.GetPostBySlugDocument,
    "query GetAllPosts($first: Int!, $after: String) {\n  categories {\n    nodes {\n      name\n      slug\n    }\n  }\n  tags {\n    nodes {\n      name\n      slug\n    }\n  }\n  posts(\n    first: $first\n    after: $after\n    where: {status: PUBLISH, orderby: {field: DATE, order: DESC}}\n  ) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    nodes {\n      ...PostCardFields\n    }\n  }\n}": typeof types.GetAllPostsDocument,
    "fragment PostCardFields on Post {\n  id\n  title\n  date\n  slug\n  excerpt\n  date\n  featuredImage {\n    node {\n      sourceUrl\n      altText\n    }\n  }\n}": typeof types.PostCardFieldsFragmentDoc,
};
const documents: Documents = {
    "query GetPostBySlug($slug: ID!) {\n  post(id: $slug, idType: SLUG) {\n    ...PostCardFields\n    content\n    author {\n      node {\n        name\n      }\n    }\n    categories {\n      nodes {\n        name\n      }\n    }\n    tags {\n      nodes {\n        slug\n        name\n      }\n    }\n  }\n}": types.GetPostBySlugDocument,
    "query GetAllPosts($first: Int!, $after: String) {\n  categories {\n    nodes {\n      name\n      slug\n    }\n  }\n  tags {\n    nodes {\n      name\n      slug\n    }\n  }\n  posts(\n    first: $first\n    after: $after\n    where: {status: PUBLISH, orderby: {field: DATE, order: DESC}}\n  ) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    nodes {\n      ...PostCardFields\n    }\n  }\n}": types.GetAllPostsDocument,
    "fragment PostCardFields on Post {\n  id\n  title\n  date\n  slug\n  excerpt\n  date\n  featuredImage {\n    node {\n      sourceUrl\n      altText\n    }\n  }\n}": types.PostCardFieldsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPostBySlug($slug: ID!) {\n  post(id: $slug, idType: SLUG) {\n    ...PostCardFields\n    content\n    author {\n      node {\n        name\n      }\n    }\n    categories {\n      nodes {\n        name\n      }\n    }\n    tags {\n      nodes {\n        slug\n        name\n      }\n    }\n  }\n}"): (typeof documents)["query GetPostBySlug($slug: ID!) {\n  post(id: $slug, idType: SLUG) {\n    ...PostCardFields\n    content\n    author {\n      node {\n        name\n      }\n    }\n    categories {\n      nodes {\n        name\n      }\n    }\n    tags {\n      nodes {\n        slug\n        name\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllPosts($first: Int!, $after: String) {\n  categories {\n    nodes {\n      name\n      slug\n    }\n  }\n  tags {\n    nodes {\n      name\n      slug\n    }\n  }\n  posts(\n    first: $first\n    after: $after\n    where: {status: PUBLISH, orderby: {field: DATE, order: DESC}}\n  ) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    nodes {\n      ...PostCardFields\n    }\n  }\n}"): (typeof documents)["query GetAllPosts($first: Int!, $after: String) {\n  categories {\n    nodes {\n      name\n      slug\n    }\n  }\n  tags {\n    nodes {\n      name\n      slug\n    }\n  }\n  posts(\n    first: $first\n    after: $after\n    where: {status: PUBLISH, orderby: {field: DATE, order: DESC}}\n  ) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    nodes {\n      ...PostCardFields\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PostCardFields on Post {\n  id\n  title\n  date\n  slug\n  excerpt\n  date\n  featuredImage {\n    node {\n      sourceUrl\n      altText\n    }\n  }\n}"): (typeof documents)["fragment PostCardFields on Post {\n  id\n  title\n  date\n  slug\n  excerpt\n  date\n  featuredImage {\n    node {\n      sourceUrl\n      altText\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;