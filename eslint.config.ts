// eslint.config.ts
import tseslint from "typescript-eslint";
import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs["flat/jsx-a11y-strict"],
  {
    languageOptions: {
      parser: astroParser,
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
];

//
//
//
// export default [
//   // Base TS config
//   ...tseslint.configs.recommendedTypeChecked,
//   {
//     files: ["*.ts", "*.tsx"],
//     languageOptions: {
//       parser: tseslint.parser,
//       parserOptions: {
//         project: "./tsconfig.json",
//       },
//     },
//   },
//
//   // Astro support
//   {
//     files: ["*.astro", "**/*.astro"],
//     languageOptions: {
//       parser: astroParser,
//       parserOptions: {
//         parser: tseslint.parser,
//         extraFileExtensions: [".astro"],
//         project: "./tsconfig.json",
//       },
//     },
//     plugins: {
//       astro: astroPlugin,
//     },
//     rules: {},
//   },
// ];
