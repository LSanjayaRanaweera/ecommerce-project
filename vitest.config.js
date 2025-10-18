import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",         // Simulates a browser-like DOM for React testing
    globals: true,                // Enables global test functions like `describe`, `it`, `expect`
    setupFiles: './setupTests.js' // Runs setup code before tests (e.g., jest-dom matchers)
  }
});