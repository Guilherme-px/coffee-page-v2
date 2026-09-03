import { fileURLToPath } from "node:url";
import { defineConfig, coverageConfigDefaults } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    name: "unit",
                    include: ["test/unit/**/*.{test,spec}.ts"],
                    environment: "node",
                },
                resolve: {
                    alias: {
                        "~": fileURLToPath(new URL("./app", import.meta.url)),
                    },
                },
            },

            await defineVitestProject({
                test: {
                    name: "nuxt",
                    include: ["test/nuxt/**/*.{test,spec}.ts"],
                    environment: "nuxt",
                    hookTimeout: 9_0000,
                    testTimeout: 9_0000,
                    environmentOptions: {
                        nuxt: {
                            domEnvironment: "jsdom",
                            mock: {
                                intersectionObserver: true,
                                indexedDb: true,
                            },
                        },
                    },
                    setupFiles: ["test/nuxt/setup.ts"],
                },
            }),
        ],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            reportsDirectory: "./coverage",
            exclude: [
                ...coverageConfigDefaults.exclude,
                "nuxt.config.ts",
                "**/.nuxt/**",
                "**/test/**",
                "**/scripts/**",
            ],
            include: [
                "app/components/**",
                "app/composables/**",
                "app/utils/**",
            ],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100,
            },
        },
    },
});
