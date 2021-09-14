import { notStrictEqual, strictEqual } from "assert";
import { Slugifier } from "../../../../System/Documents/Slugifier";

/**
 * Registers tests for the {@link Slugifier `Slugifier`} class.
 */
export function SlugifierTests(): void
{
    suite(
        nameof(Slugifier),
        () =>
        {
            let slugifier: Slugifier;
            let slug: string;
            let expected: string;

            suiteSetup(
                () =>
                {
                    slug = "This Is a Test";
                    expected = "this-is-a-test";
                });

            setup(
                () =>
                {
                    slugifier = new Slugifier();
                });

            suite(
                nameof<Slugifier>((slugifier) => slugifier.CreateSlug),
                () =>
                {
                    test(
                        "Checking whether slugs are created correctly…",
                        () =>
                        {
                            strictEqual(slugifier.CreateSlug(slug), expected);
                        });

                    test(
                        "Checking whether numbers are appended to duplicate slugs…",
                        () =>
                        {
                            slugifier.CreateSlug(slug);
                            strictEqual(slugifier.CreateSlug(slug), `${expected}-2`);
                        });
                });

            suite(
                nameof<Slugifier>((slugifier) => slugifier.Reset),
                () =>
                {
                    test(
                        "Checking whether the counter of the slugs can be reset correctly…",
                        () =>
                        {
                            slugifier.CreateSlug(slug);
                            notStrictEqual(slugifier.CreateSlug(slug), expected);
                            slugifier.Reset();
                            strictEqual(slugifier.CreateSlug(slug), expected);
                        });
                });
        });
}
