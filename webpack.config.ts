import { dirname, join, parse, relative, resolve } from "path";
import { Configuration, WatchIgnorePlugin } from "webpack";

export = (env: any, argv: any) =>
{
    let sourceRoot = join(__dirname, "src");

    let externalModules: string[] = [
        "mocha",
        "vscode"
    ];

    let entryPoints: string[] = [
        join(sourceRoot, "index.ts"),
        ...(
            argv.mode === "development" ?
                [
                    join(sourceRoot, "test", "runTests.ts"),
                    join(sourceRoot, "test", "index.ts"),
                    join(sourceRoot, "test", "essentials.test.ts"),
                    join(sourceRoot, "test", "common.test.ts"),
                    join(sourceRoot, "test", "single-file.test.ts"),
                    join(sourceRoot, "test", "single-folder.test.ts"),
                    join(sourceRoot, "test", "workspace.test.ts")
                ] :
                []
        )
    ];

    let externals: Record<string, string> = {};
    let entry: Record<string, string> = {};

    for (let externalModule of externalModules)
    {
        externals[externalModule] = `commonjs ${externalModule}`;
    }

    for (let entryPoint of entryPoints)
    {
        entry[join(relative(sourceRoot, dirname(entryPoint)), parse(entryPoint).name)] = entryPoint;
    }

    return {
        target: "node",
        entry,
        output: {
            path: resolve(__dirname, "lib"),
            filename: "[name].js",
            libraryTarget: "commonjs2",
            devtoolFallbackModuleFilenameTemplate: "../[resource-path]",
            hashFunction: "xxhash64"
        },
        devtool: "source-map",
        externals,
        resolve: {
            extensions: [
                ".ts",
                ".js",
                ".json"
            ],
            extensionAlias: {
                ".js": [
                    ".js",
                    ".ts"
                ],
                ".mjs": [
                    ".mjs",
                    ".mts"
                ],
                ".cjs": [
                    ".cjs",
                    ".cts"
                ]
            },
            mainFields: [
                "main",
                "module"
            ]
        },
        plugins: [
            new WatchIgnorePlugin(
                {
                    paths: [
                        /\.d\.ts$/
                    ]
                })
        ],
        module: {
            rules: [
                {
                    test: /\.[cm]?tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                projectReferences: true,
                                compilerOptions: {
                                    outDir: resolve(__dirname, "lib", "temp")
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.json$/i,
                    exclude: /node_modules/,
                    loader: "json5-loader",
                    type: "javascript/auto",
                    options: {
                        esModule: false
                    }
                }
            ]
        },
        node: {
            __dirname: false,
            __filename: false
        },
        stats: {
            warnings: false
        }
    } as Configuration;
};
