import { ConfigInterceptorTests } from "./ConfigInterceptor.test.js";
import { SystemTests } from "./System/index.js";

/**
 * Registers tests for configuration-components.
 */
export function EssentialTests(): void
{
    suite(
        "MarkdownConverter",
        () =>
        {
            ConfigInterceptorTests();
            SystemTests();
        });
}
