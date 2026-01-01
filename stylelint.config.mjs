const config = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-tailwindcss",
    "stylelint-config-html/html",
  ],
  plugins: ["stylelint-order"],
  rules: {
    // ============================================
    // PROPERTY ORDER
    // ============================================
    "order/properties-order": [
      "content",
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "flex",
      "flex-direction",
      "flex-wrap",
      "justify-content",
      "align-items",
      "grid",
      "grid-template",
      "grid-template-columns",
      "grid-template-rows",
      "gap",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "margin",
      "padding",
      "border",
      "border-radius",
      "background",
      "color",
      "font",
      "font-size",
      "font-weight",
      "line-height",
      "text-align",
      "opacity",
      "transform",
      "transition",
      "animation",
    ],

    // ============================================
    // TAILWIND CSS V4 RULES
    // ============================================
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "import",
          "theme",
          "source",
          "utility",
          "variant",
          "custom-variant",
          "apply",
          "reference",
          "config",
          "plugin",
        ],
      },
    ],
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme", "--alpha", "--spacing"],
      },
    ],

    // ============================================
    // IMPORT RULES (Tailwind v4)
    // ============================================
    "import-notation": null, // Allow string imports like @import "tailwindcss"

    // ============================================
    // CSS BEST PRACTICES
    // ============================================
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "keyframes-name-pattern": null,
    "value-keyword-case": [
      "lower",
      {
        ignoreProperties: ["font-family"],
      },
    ],

    // ============================================
    // TAILWIND-SPECIFIC
    // ============================================
    "no-descending-specificity": null,
    "no-duplicate-selectors": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "shorthand-property-no-redundant-values": true,

    // ============================================
    // QUALITY RULES
    // ============================================
    "lightness-notation": null,
    "hue-degree-notation": null,
    "color-no-invalid-hex": true,
    "font-family-no-duplicate-names": true,
    "font-family-no-missing-generic-family-keyword": true,
    "function-calc-no-unspaced-operator": true,
    "string-no-newline": true,
    "unit-no-unknown": true,
    "property-no-unknown": true,
    "declaration-block-no-duplicate-properties": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": [
      true,
      {
        ignore: ["custom-elements"],
      },
    ],
    "media-feature-name-no-unknown": true,
    "comment-no-empty": true,
    "no-invalid-double-slash-comments": true,
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      customSyntax: "postcss-html",
    },
  ],
  ignoreFiles: [
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
    "**/node_modules/**",
    "**/.next/**",
    "**/dist/**",
    "**/build/**",
    "**/out/**",
  ],
};

export default config;
