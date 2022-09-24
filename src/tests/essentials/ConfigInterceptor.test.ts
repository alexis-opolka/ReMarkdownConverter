import { deepStrictEqual, ok, strictEqual } from "assert";
import { ConfigurationTarget, workspace, WorkspaceConfiguration } from "vscode";
import { ConversionType } from "../../Conversion/ConversionType";
import { ISettings } from "../../Properties/ISettings";
import { Settings } from "../../Properties/Settings";
import { ConfigInterceptor } from "../ConfigInterceptor";

/**
 * Registers tests for the {@link ConfigInterceptor `ConfigInterceptor`} class.
 */
export function ConfigInterceptorTests(): void
{
    suite(
        nameof(ConfigInterceptor),
        () =>
        {
            let config: WorkspaceConfiguration;
            let systemParserSetting = "Parser.SystemParserEnabled" as const;
            let key: keyof ISettings;
            let interceptor: ConfigInterceptor<ISettings>;
            let originalSetting: Array<keyof typeof ConversionType>;
            let interceptedSetting: Array<keyof typeof ConversionType>;

            suiteSetup(
                async function()
                {
                    this.timeout(10 * 1000);
                    config = workspace.getConfiguration(Settings.ConfigKey, workspace.workspaceFolders[0].uri);
                    key = nameof<ISettings>((settings) => settings.ConversionType) as keyof ISettings;
                    originalSetting = [ConversionType[ConversionType.JPEG]] as any;
                    interceptedSetting = [ConversionType[ConversionType.HTML]] as any;
                    await config.update(key, originalSetting, ConfigurationTarget.Workspace);
                    interceptor = new ConfigInterceptor(Settings.ConfigKey);
                    interceptor.Initialize();
                });

            suiteTeardown(
                () =>
                {
                    interceptor.Dispose();
                });

            setup(
                () =>
                {
                    interceptor.Settings = {
                        [key]: interceptedSetting
                    };
                });

            suite(
                nameof<ConfigInterceptor>((interceptor) => interceptor.Initialize),
                () =>
                {
                    test(
                        "Checking whether original settings are resolved correctly…",
                        async () =>
                        {
                            interceptor.Settings = {};
                            ok(key in workspace.getConfiguration(Settings.ConfigKey));

                            deepStrictEqual(
                                workspace.getConfiguration(Settings.ConfigKey).get(key),
                                originalSetting);
                        });

                    test(
                        "Checking whether settings can be intercepted dynamically…",
                        () =>
                        {
                            deepStrictEqual(
                                workspace.getConfiguration(Settings.ConfigKey).get(key),
                                interceptedSetting);

                            delete interceptor.Settings[key];

                            deepStrictEqual(
                                workspace.getConfiguration(Settings.ConfigKey).get(key),
                                originalSetting);
                        });

                    test(
                        "Checking whether absence of a section can be simulated…",
                        () =>
                        {
                            (interceptor.Settings as any)[key] = undefined;
                            ok(!workspace.getConfiguration(Settings.ConfigKey).has(key));
                            ok(!(key in workspace.getConfiguration(Settings.ConfigKey)));
                            delete interceptor.Settings[key];
                            ok(workspace.getConfiguration(Settings.ConfigKey).has(key));
                        });

                    test(
                        "Checking whether default values are returned if the absence of a section is simulated…",
                        () =>
                        {
                            (interceptor.Settings as any)[key] = undefined;

                            deepStrictEqual(
                                workspace.getConfiguration(Settings.ConfigKey).get(key),
                                workspace.getConfiguration(Settings.ConfigKey).inspect(key).defaultValue);
                        });

                    test(
                        "Checking whether variable-inspections are intercepted, too…",
                        async () =>
                        {
                            let result = workspace.getConfiguration(Settings.ConfigKey).inspect(key);
                            deepStrictEqual(result.globalLanguageValue, result.globalValue);
                            deepStrictEqual(result.globalValue, result.workspaceFolderLanguageValue);
                            deepStrictEqual(result.workspaceFolderLanguageValue, result.workspaceFolderValue);
                            deepStrictEqual(result.workspaceFolderValue, result.workspaceLanguageValue);
                            deepStrictEqual(result.workspaceLanguageValue, result.workspaceValue);
                            deepStrictEqual(result.workspaceValue, interceptedSetting);
                        });

                    test(
                        "Checking whether configurations can be read from the configuration-object directly…",
                        () =>
                        {
                            let markdownConfig = workspace.getConfiguration(Settings.ConfigKey);
                            ok(key in markdownConfig);
                            strictEqual(markdownConfig[key], interceptedSetting);
                        });

                    test(
                        "Checking whether object-proxies are intercepted…",
                        () =>
                        {
                            interceptor.Settings[systemParserSetting] = true;
                            strictEqual(workspace.getConfiguration(Settings.ConfigKey).get(systemParserSetting), true);
                            interceptor.Settings[systemParserSetting] = false;
                            strictEqual(workspace.getConfiguration(Settings.ConfigKey).get(systemParserSetting), false);
                        });
                });
        });
}
