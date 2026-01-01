/** @type {import('prettier-plugin-embed').PrettierPluginEmbedOptions} */
const prettierPluginEmbedConfig = {
  embeddedSqlComments: ["sql"],
};

/** @type {import('prettier-plugin-sql').SqlBaseOptions} */
const prettierPluginSqlConfig = {
  language: "postgresql",
  keywordCase: "upper",
};

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",
  printWidth: 80,
  plugins: [
    "prettier-plugin-sql",
    "prettier-plugin-embed",
    "prettier-plugin-tailwindcss",
  ],
  endOfLine: "lf",
};

const defaultConfig = {
  ...config,
  ...prettierPluginEmbedConfig,
  ...prettierPluginSqlConfig,
};

export default defaultConfig;
