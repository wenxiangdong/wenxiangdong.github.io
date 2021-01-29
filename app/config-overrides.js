const { override, addBabelPlugins, addPostcssPlugins } = require('customize-cra');
module.exports = override(
    ...addBabelPlugins(
        "@babel/plugin-proposal-optional-chaining",
        
    ),
    addPostcssPlugins(
        [require("tailwindcss"),
        require("autoprefixer")]
    )
);