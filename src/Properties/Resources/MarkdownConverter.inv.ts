/**
 * Provides resources for the invariant culture.
 */
export let MarkdownConverterInvariant = {
    SuccessMessage: "Successfully wrote the {0}-file to \"{1}\".",
    CollectionFinished: "The documents have been converted successfully. Do you want to show info about the files?",
    OpenFileLabel: "Open File",
    UncaughtException: "An unexpected error occurred",
    UnknownException: "{{UncaughtException}}:\n{0}: {1}",
    UnknownError: "{{UncaughtException}}:\n{0}",
    OperationCancelledException: "The operation has been cancelled.",
    FileException: "Couldn't access \"{0}\".",
    FileNotFoundException: "The file \"{0}\" couldn't be found.",
    NoConversionType: "No conversion type was selected. Please review your settings.",
    MarkdownFileException: "Couldn't find a markdown-file.",
    YAMLException: "The YAML-block is malformed. Line {0}, column {1}.",
    UnsupportedPlatformException: "This feature is not supported by your platform!",
    NoWorkspaceFolderException: "No workspace-folder is opened!",
    CustomBrowserNotFound: "The configured chromium-path does not exist. You might want to review this setting.\nDo you want to retry?",
    UpdateMessage: "Before you can get started with MarkdownConverter you need to download chromium.\nDo you want to do this now?",
    Yes: "Yes",
    No: "No",
    UpdateRunning: "Downloading Chromium revision {0}… Please wait…",
    UpdateSuccess: "The download was successful!\nYou are ready to use MarkdownConverter now!",
    UpdateFailed: "The download failed.\nYou may want to declare \"http.proxy\" or \"http.proxyStrictSSL\" if you're using a proxy.\nDo you want to retry the download?",
    DestinationPath: "Please specify a destination-path to save the document to.",
    DestinationPathExample: "e.g. C:\\Temp or /tmp/",
    DocumentName: "Please specify the name of the document to create.",
    DocumentNameExample: "e.g. Handbook or Manual",
    Progress: {
        LaunchWebserver: "Initializing a web-server…",
        LaunchChromium: "Launching a chromium-instance…",
        ConversionStarting: "Starting to convert the file to the {0}-type…",
        ResolveFileName: "Resolving the destination-filename…",
        WriteHTML: "Rendering and writing html-file…",
        Scrape: "Scraping all files and resources…",
        ScrapeFolder: "Moving the scraped files to the correct folder…",
        ChromiumPage: "Launching the page in chromium…",
        PDF: "Rendering a PDF-file…",
        Screenshot: "Taking a screenshot…",
        ConverterFinished: "The conversion of the {0}-file has finished",
        SearchDocuments: "Searching for markdown-documents…",
        DocumentsFound: "Found {0} markdown-documents",
        CollectionStep: "Converting document {0} out of {1}…",
        ChainDocuments: "Chaining all documents together…"
    },
    TaskTitle: {
        Convert: "Convert Document",
        ConvertAll: "Convert all Documents",
        Chain: "Chain all Documents"
    },
    DateTime: {
        Era: {
            Before: "B.C.",
            After: "A.D."
        },
        TimeSeparator: ":",
        DateSeparator: "-",
        Formats: {
            Default: "yyyy/MM/dd",
            FullDate: "dddd, MMMM d, yyyy"
        },
        DaysOfWeek: {
            ShortNames: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],
            FullNames: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ]
        },
        Months: {
            ShortNames: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            FullNames: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ]
        },
        TimeDesignator: {
            ShortNames: [
                "A",
                "P"
            ],
            FullNames: [
                "AM",
                "PM"
            ]
        }
    }
};
