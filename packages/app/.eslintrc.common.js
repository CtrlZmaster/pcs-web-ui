module.exports = {
  // ESLint automatically looks for configuration files in the directory of the
  // file to be linted + in successive parent directories all the way up to the
  // * root directory of the filesystem (/),
  // * the home directory of the current user (~/),
  // * or when root: true is specified.
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    warnOnUnsupportedTypeScriptVersion: true,
  },
  // ESlint default behaviour ignores file/folders starting with "."
  // https://github.com/eslint/eslint/issues/10341
  ignorePatterns: ["!.bin*", "node_modules"],
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // http://eslint.org/docs/rules/
    "array-callback-return": "warn",
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "comma-style": [
      "warn",
      "first",
      {exceptions: {ArrayExpression: true, ObjectExpression: true}},
    ],
    "default-case": ["warn", {commentPattern: "^no default$"}],
    "dot-location": ["warn", "property"],
    eqeqeq: ["warn", "smart"],
    "max-len": [
      "error",
      80,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "new-parens": "warn",
    "no-array-constructor": "warn",
    "no-caller": "warn",
    "no-cond-assign": ["warn", "except-parens"],
    "no-const-assign": "warn",
    "no-continue": "off",
    "no-control-regex": "warn",
    "no-delete-var": "warn",
    "no-dupe-args": "warn",
    "no-dupe-class-members": "warn",
    "no-dupe-keys": "warn",
    "no-duplicate-case": "warn",
    "no-empty-character-class": "warn",
    "no-empty-pattern": "warn",
    "no-eval": "warn",
    "no-ex-assign": "warn",
    "no-extend-native": "warn",
    "no-extra-bind": "warn",
    "no-extra-label": "warn",
    "no-fallthrough": "warn",
    "no-func-assign": "warn",
    "no-implied-eval": "warn",
    "no-invalid-regexp": "warn",
    "no-iterator": "warn",
    "no-label-var": "warn",
    "no-labels": ["warn", {allowLoop: true, allowSwitch: false}],
    "no-lone-blocks": "warn",
    "no-loop-func": "warn",
    "no-mixed-operators": [
      "warn",
      {
        groups: [
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"],
        ],
        allowSamePrecedence: false,
      },
    ],
    "no-multi-str": "warn",
    "no-multiple-empty-lines": "warn",
    "no-global-assign": "warn",
    "no-unsafe-negation": "warn",
    "no-new-func": "warn",
    "no-new-object": "warn",
    "no-new-symbol": "warn",
    "no-new-wrappers": "warn",
    "no-obj-calls": "warn",
    "no-octal": "warn",
    "no-octal-escape": "warn",
    "no-redeclare": "warn",
    "no-regex-spaces": "warn",
    "no-restricted-syntax": ["warn", "LabeledStatement", "WithStatement"],
    "no-script-url": "warn",
    "no-self-assign": "warn",
    "no-self-compare": "warn",
    "no-sequences": "warn",
    "no-shadow-restricted-names": "warn",
    "no-sparse-arrays": "warn",
    "no-template-curly-in-string": "warn",
    "no-this-before-super": "warn",
    "no-throw-literal": "warn",
    "no-undef": "error",
    "no-unreachable": "warn",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    "no-unused-labels": "warn",
    "no-unused-vars": [
      "warn",
      {
        args: "none",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "no-use-before-define": [
      "warn",
      {
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-constructor": "warn",
    "no-useless-escape": "warn",
    "no-useless-rename": [
      "warn",
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    "no-with": "warn",
    "no-whitespace-before-property": "warn",
    "operator-linebreak": ["error", "before", {overrides: {"=": "ignore"}}],
    quotes: ["error", "double", {avoidEscape: true}],
    "require-yield": "warn",
    "rest-spread-spacing": ["warn", "never"],
    semi: ["error", "always", {omitLastInOneLineBlock: true}],
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
    strict: ["warn", "never"],
    "unicode-bom": ["warn", "never"],
    "use-isnan": "warn",
    "valid-typeof": "warn",
    "getter-return": "warn",
  },

  overrides: [
    {
      files: ["**/*.ts?(x)"],
      plugins: ["@typescript-eslint"],
      // If adding a typescript-eslint version of an existing ESLint rule,
      // make sure to disable the ESLint rule here.
      rules: {
        // TypeScript's `noFallthroughCasesInSwitch` is more robust (#6906)
        "default-case": "off",
        // 'tsc' already handles this
        // https://github.com/typescript-eslint/typescript-eslint/issues/291
        "no-dupe-class-members": "off",
        // 'tsc' already handles this
        // https://github.com/typescript-eslint/typescript-eslint/issues/477
        "no-undef": "off",

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": [
          "error",
          {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            exports: "always-multiline",
            functions: "always-multiline",
            enums: "always-multiline",
            generics: "always-multiline",
            tuples: "always-multiline",
          },
        ],
        "@typescript-eslint/consistent-type-assertions": "warn",
        "@typescript-eslint/member-delimiter-style": [
          "error",
          {
            multiline: {delimiter: "semi", requireLast: true},
            singleline: {delimiter: "semi", requireLast: false},
            multilineDetection: "brackets",
          },
        ],
        "no-array-constructor": "off",
        "@typescript-eslint/no-array-constructor": "warn",
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "warn",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
          "warn",
          {
            functions: false,
            classes: false,
            variables: false,
            typedefs: false,
          },
        ],
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": [
          "error",
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            args: "none",
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            ignoreRestSiblings: true,
          },
        ],
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "warn",
        semi: "off",
        "@typescript-eslint/semi": [
          "error",
          "always",
          {omitLastInOneLineBlock: true},
        ],
      },
    },
  ],
};
