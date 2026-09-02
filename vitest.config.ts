import { defineConfig } from "vitest/config";
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
            include: ["app/composables/**", "app/components/**"],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100,
            },
        },
    },
});
