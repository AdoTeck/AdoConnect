import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginPlaywright from "eslint-plugin-playwright";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base configurations from compat
  ...compat.extends(
    "next/core-web-vitals", // Next.js recommended settings
    "next/typescript", // Next.js + TypeScript rules
    "plugin:@typescript-eslint/recommended", // TypeScript rules
    "plugin:tailwindcss/recommended", // Tailwind CSS rules
    "plugin:playwright/recommended", // Playwright rules
    "plugin:prettier/recommended", // Prettier integration
  ),
  {
    // Flat config style
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: typescriptEslintParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      tailwindcss: eslintPluginTailwindcss,
      playwright: eslintPluginPlaywright,
      "simple-import-sort": eslintPluginSimpleImportSort,
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Simple import sort rules
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // Prettier rules
      "prettier/prettier": "error",
      // Tailwind CSS specific rules
      "tailwindcss/no-custom-classname": "off",
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
