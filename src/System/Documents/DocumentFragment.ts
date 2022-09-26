import { load } from "cheerio";
import fs from "fs-extra";
import Handlebars from "handlebars";
import { Utilities } from "../../Utilities.js";
import { DateTimeFormatter } from "../Globalization/DateTimeFormatter.js";
import { InsertionType } from "./Assets/InsertionType.js";
import { PictureSource } from "./Assets/PictureSource.js";
import { AttributeKey } from "./AttributeKey.js";
import { Document } from "./Document.js";
import { HelperKey } from "./HelperKey.js";
import { Renderable } from "./Renderable.js";

const { statSync } = fs;
const sourceAttributeName = "src";

/**
 * Represents a fragment of a document.
 */
export class DocumentFragment extends Renderable
{
    /**
     * A component for rendering the fragment.
     */
    private renderer: typeof Handlebars = null;

    /**
     * The document this fragment belongs to.
     */
    private document: Document;

    /**
     * Initializes a new instance of the  {@link DocumentFragment `DocumentFragment`} class.
     *
     * @param document
     * The document this fragment belongs to.
     */
    public constructor(document: Document)
    {
        super();
        this.document = document;
    }

    /**
     * Gets a component for rendering the fragment.
     */
    public get Renderer(): typeof Handlebars
    {
        if (this.renderer === null)
        {
            this.renderer = Handlebars.create();

            this.Renderer.registerHelper(
                HelperKey.FormatDate,
                (value: any, format: string) =>
                {
                    return this.FormatDate(value, format);
                });
        }

        return this.renderer;
    }

    /**
     * Gets the document this fragment belongs to.
     */
    public get Document(): Document
    {
        return this.document;
    }

    /**
     * Renders the fragment.
     *
     * @returns
     * The rendered text.
     */
    public override async Render(): Promise<string>
    {
        let $ = load(await super.Render(), undefined, false);

        await Promise.all(
            $("img").map(
                (index, element) =>
                {
                    let link = $(element).attr(sourceAttributeName);
                    let source = new PictureSource(this.Document, link);
                    source.InsertionType = this.Document.PictureInsertionTypes.get(source.URLType) ?? InsertionType.Default;
                    return (async () => $(element).attr(sourceAttributeName, await source.Render()))();
                }));

        return $.html();
    }

    /**
     * Renders the fragment.
     *
     * @returns
     * The rendered text.
     */
    protected async RenderContent(): Promise<string>
    {
        let view: Record<string, unknown> = { ...this.Document.Attributes };
        let tempHelpers: string[] = [];

        let dateKeys = [
            AttributeKey.CreationDate,
            AttributeKey.ChangeDate,
            AttributeKey.CurrentDate
        ];

        let attributeKeys = [
            ...dateKeys,
            AttributeKey.Title,
            AttributeKey.Author
        ];

        let dateResolver = (key: string): Date =>
        {
            if (this.Document.FileName)
            {
                switch (key)
                {
                    case AttributeKey.CreationDate:
                        return statSync(this.Document.FileName).birthtime;
                    case AttributeKey.ChangeDate:
                        return statSync(this.Document.FileName).mtime;
                    case AttributeKey.CurrentDate:
                    default:
                        return new Date();
                }
            }
            else
            {
                return new Date();
            }
        };

        for (let key of attributeKeys)
        {
            if (!(key in view))
            {
                if (dateKeys.includes(key))
                {
                    view[key] = dateResolver(key);
                }
                else
                {
                    switch (key)
                    {
                        case AttributeKey.Title:
                            view[key] = this.Document.Title;
                            break;
                        case AttributeKey.Author:
                            view[key] = await Utilities.GetFullName();
                            break;
                    }
                }
            }
        }

        for (let key in view)
        {
            let value = view[key];

            if (value instanceof Date)
            {
                tempHelpers.push(key);

                this.Renderer.registerHelper(
                    key,
                    (format?: string) =>
                    {
                        return this.FormatDate(
                            value as Date,
                            typeof format === "string" ?
                                format :
                                this.Document.DefaultDateFormat);
                    });
            }
        }

        let result = this.RenderTemplate(this.Content, view);

        for (let key of tempHelpers)
        {
            this.Renderer.unregisterHelper(key);
        }

        return result;
    }

    /**
     * Renders the specified {@link content `content`} with the specified {@link view `view`}.
     *
     * @param content
     * The content to render.
     *
     * @param view
     * The attributes to use for rendering.
     *
     * @returns
     * The rendered representation of the specified {@link content `content`}.
     */
    protected async RenderTemplate(content: string, view: Record<string, unknown>): Promise<string>
    {
        return this.Renderer.compile(content)(view);
    }

    /**
     * Formats the specified date-{@link value `value`} with the specified {@link format `format`}.
     *
     * @param value
     * The date to format.
     *
     * @param format
     * The format to apply.
     *
     * @returns
     * The formatted date.
     */
    protected FormatDate(value: string | Date, format?: string): string
    {
        format ??= this.Document.DefaultDateFormat;

        if (format)
        {
            return new DateTimeFormatter(this.Document.Locale).Format(
                (format in this.Document.DateFormats) ? this.Document.DateFormats[format] : format,
                new Date(value));
        }
        else
        {
            return value.toString();
        }
    }
}
