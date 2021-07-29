/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  settings: {
    "import/resolver": "webpack"
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-plugin-prettier"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier"
  ],
  rules: {
    "no-unused-vars": "warn",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    "max-len": [
      0,
      {
        code: 100,
        ignoreUrls: true
      }
    ],
    "array-callback-return": 0,
    camelcase: 0,
    "class-methods-use-this": 0,
    "default-case": 0,
    "no-undef": 0,
    "no-restricted-globals": 0,
    "no-unused-vars": 0,
    "no-continue": 0,
    "no-plusplus": 0,
    "no-param-reassign": 0,
    "no-use-before-define": 0,
    "no-confusing-arrow": 0,
    "no-useless-constructor": 0,
    "no-nested-ternary": 0,
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0,
    "no-return-await": 0,
    "no-return-assign": 0,
    "global-require": 0,
    "consistent-return": 0,
    "lines-around-comment": 0,
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true
      }
    ],
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-self-import": 0, // /src/app/services/review/actions/reviews.ts
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "react/no-array-index-key": 0,
    "react/button-has-type": 0,
    "react/sort-comp": 0,
    "react/no-access-state-in-setstate": 0,
    "react/no-unescaped-entities": 0,
    "react/no-unused-state": 0,
    "react/no-did-update-set-state": 0,
    "react/state-in-constructor": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prefer-stateless-function": 0,
    "react-hooks/exhaustive-deps": 0,
    "react-hooks/rules-of-hooks": 0,
    "jsx-a11y/no-interactive-element-to-noninteractive-role": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/alt-text": 0,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/iframe-has-title": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/tabindex-no-positive": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/unbound-method": 0,
    "@typescript-eslint/prefer-regexp-exec": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    quotes: [2, "double", { avoidEscape: false }]
  },
  overrides: [
    {
      files: "src/**/*.{js,jsx,ts,tsx}",
      rules: {
        "simple-import-sort/sort": "off",
        "import/order": [
          "error",
          {
            "newlines-between": "always",
            groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]]
          }
        ],
        "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
        "react/prop-types": 0,
        "react/require-default-props": 0
      }
    }
  ]
};
