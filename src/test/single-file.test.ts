import { SingleFileTests } from "../tests/single-file/index.js";
import { CommonHooks } from "./CommonHooks.js";

suite(
    "Tests for Visual Studio Code in Single-File Mode",
    () =>
    {
        let context = CommonHooks();
        SingleFileTests(context);
    });
