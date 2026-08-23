import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Ignore generated/build files
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "coverage/**",
      "*.config.js",
      "*.config.ts",
    ],
  },

  // Base JavaScript + TypeScript rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      /* React Hooks */
      ...reactHooks.configs.recommended.rules,

      /* React Fast Refresh */
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: [
            "loader",
            "action",
            "meta",
            "links",
            "headers",
          ],
        },
      ],

      /* TypeScript */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      /* JavaScript */
      "no-console": "warn",
      "no-debugger": "warn",

      /* Code quality */
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // Development-friendly exceptions
  {
    files: ["**/*.{test,spec}.{ts,tsx}"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
