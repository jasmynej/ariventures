import { GraphQLClient } from 'graphql-request';

const url = 'https://ariventures.co/graphql';
const basic = process.env.WP_BASIC_AUTH
    ? 'Basic ' + Buffer.from(process.env.WP_BASIC_AUTH).toString('base64')
    : undefined;

export const wp = new GraphQLClient(url, {
    headers: basic ? { Authorization: basic } : {},
});