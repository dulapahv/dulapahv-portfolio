import path from "node:path";
import { loadEnvFile } from "node:process";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

loadEnvFile(path.resolve(__dirname, ".env"));

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.tsx"],
    css: true,
    include: ["**/*.test.{ts,tsx}"],
    coverage: {
      enabled: true,
      provider: "v8",
      include: [
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "lib/**/*.{ts,tsx}",
        "hooks/**/*.{ts,tsx}",
      ],
      exclude: [
        ".content-collections/**",
        "**/*.svg",
        "**/*.test.*",
        "**/vitest.setup.*",
        "**/node_modules/**",
      ],
      reporter: ["text", "lcov", "cobertura", "html"],
    },
    reporters: ["dot"],
  },
});
