import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://ariventures.co/graphql',
  documents: 'wordpress/queries/**/*.graphql',
  generates: {
    'wordpress/gql/': {
      preset: 'client', // gives typed documents + helpers
      plugins: [],
      presetConfig: { fragmentMasking: false }
    },
  },
};

export default config;