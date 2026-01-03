import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";
import promisePlugin from "eslint-plugin-promise";
import securityPlugin from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import unusedImports from "eslint-plugin-unused-imports";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
      security: securityPlugin,
      sonarjs: sonarjs,
      promise: promisePlugin,
    },
    rules: {
      // ============================================
      // JAVASCRIPT RULES
      // ============================================

      // Code Quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      "prefer-template": "warn",
      "no-implicit-coercion": "error",
      "no-throw-literal": "error",

      // Prevent Common Mistakes
      "no-await-in-loop": "warn",
      "require-atomic-updates": "error",
      "no-return-await": "error",
      "no-nested-ternary": "warn",
      "no-else-return": "warn",
      "consistent-return": "warn",
      "default-case-last": "error",
      "no-param-reassign": ["warn", { props: true }],
      "no-shadow": "off", // Handled by TS version

      // Complexity Limits
      "max-depth": ["warn", 4],
      "max-lines-per-function": "off",
      "max-nested-callbacks": ["warn", 3],

      // ============================================
      // TYPESCRIPT RULES
      // ============================================

      // TypeScript Best Practices
      "@typescript-eslint/no-unused-vars": "off", // Handled by unused-imports
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/strict-boolean-expressions": "off",

      // Type Safety
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      // ============================================
      // REACT RULES
      // ============================================

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React Best Practices
      "react/jsx-no-target-blank": "error",
      "react/jsx-key": "error",
      "react/self-closing-comp": "warn",
      "react/jsx-curly-brace-presence": [
        "warn",
        {
          props: "never",
          children: "never",
        },
      ],
      "react/jsx-boolean-value": ["warn", "never"],
      "react/no-unescaped-entities": "warn",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-useless-fragment": "warn",

      // React Performance
      "react/jsx-no-bind": [
        "warn",
        {
          allowArrowFunctions: true,
          allowBind: false,
          ignoreRefs: true,
        },
      ],

      // Next.js Specific
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",

      // ============================================
      // IMPORT & MODULE RULES
      // ============================================

      // Import Organization
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "next",
              group: "external",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@/services/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/providers/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/components/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/hooks/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/config/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/lib/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/constants/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/schemas/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/types/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/public/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Import Quality
      "import/no-duplicates": "error",
      "import/no-cycle": "error",
      "import/no-self-import": "error",
      "import/no-useless-path-segments": "error",
      "import/newline-after-import": "warn",
      "import/no-anonymous-default-export": "warn",

      // Unused Imports Cleanup
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // ============================================
      // SECURITY & ACCESSIBILITY
      // ============================================

      // Accessibility (from next/core-web-vitals)
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",

      // Security
      "security/detect-non-literal-regexp": "warn",
      "security/detect-unsafe-regex": "error",

      // ============================================
      // CODE SMELL DETECTION
      // ============================================

      // SonarJS
      "sonarjs/no-duplicate-string": ["warn", { threshold: 5 }],
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/no-collapsible-if": "warn",
      "sonarjs/prefer-single-boolean-return": "warn",

      // ============================================
      // PROMISE HANDLING
      // ============================================

      // Promise Plugin
      "promise/always-return": "warn",
      "promise/catch-or-return": "error",
      "promise/no-nesting": "warn",
      "promise/prefer-await-to-then": "warn",
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    ".swc/**",
    "node_modules/**",
    "next-env.d.ts",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
