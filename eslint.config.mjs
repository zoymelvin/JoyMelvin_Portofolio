import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Gunakan base rule Next.js + TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts"
    ],

    rules: {
      // 🔧 Nonaktifkan rule yang bikin build gagal di Vercel
      "@next/next/no-img-element": "off",
      "jsx-a11y/alt-text": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      // Opsional: hindari error kecil yang tidak perlu
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "warn"
    },
  },
];

export default eslintConfig;
