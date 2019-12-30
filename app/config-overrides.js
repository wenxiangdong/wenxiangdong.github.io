const { override, addBabelPlugins, addWebpackModuleRule } = require('customize-cra');
module.exports = override(
    ...addBabelPlugins(
        "@babel/plugin-proposal-optional-chaining"
    ),
    addWebpackModuleRule({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
    }),
);