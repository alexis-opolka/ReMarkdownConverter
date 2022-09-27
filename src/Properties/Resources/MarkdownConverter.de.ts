import { MarkdownConverterInvariant } from "./MarkdownConverter.inv.js";

/**
 * Provides resources for the German culture.
 */
export let MarkdownConverterGerman: Partial<Record<keyof typeof MarkdownConverterInvariant, unknown>> = {
    SuccessMessage: "Die konvertierte {0}-Datei wurde erfolgreich nach \"{1}\" geschrieben.",
    OpenFileLabel: "Datei Öffnen",
    UncaughtException: "Ein unerwarteter Fehler ist aufgetreten",
    OperationCancelledException: "Der Vorgang wurde abgebrochen.",
    FileException: "Auf die Datei \"{0}\" konnte nicht zugegriffen werden.",
    FileNotFoundException: "Die Datei \"{0}\" konnte nicht gefunden werden.",
    NoConversionType: "Es wurde kein zu konvertierender Datei-Typ ausgewählt. Bitte überprüfen Sie Ihre Einstellungen.",
    MarkdownFileException: "Es konnte keine Markdown-Datei gefunden werden.",
    YAMLException: "Fehler: Der YAML-Block ist nicht richtig formatiert. Zeile {0}, Spalte {1}.",
    UnsupportedPlatformException: "Diese Funktion wird von Ihrer Platform nicht unterstützt!",
    NoWorkspaceFolderException: "Es ist kein Ordner geöffnet!",
    CustomBrowserNotFound: "Der in den Einstellungen festgelegte Chromium-Pfad existiert nicht.\nWollen Sie es erneut versuchen?",
    UpdateMessage: "Bevor Sie mit MarkdownConverter durchstarten können, muss Chromium gedownloadet werden.\nWollen Sie den Download starten?",
    Yes: "Ja",
    No: "Nein",
    UpdateRunning: "Chromium Version {0} wird heruntergeladen… Bitte warten…",
    UpdateSuccess: "Download abgeschlossen!\nSie sind nun bereit, um MarkdownConverter nutzen zu können!",
    UpdateFailed: "Der download ist fehlgeschlagen.\nMöglicherweise hilft es, \"http.proxy\" oder \"http.proxyStrictSSL\" zu deklarieren, falls Sie eine Proxy nutzen.\nWollen Sie den Download erneut starten?",
    DestinationPath: "Bitte geben Sie einen Ordner an, in dem Sie die Ausgabedatei ablegen wollen.",
    DestinationPathExample: "Bspw. C:\\Temp oder /tmp/",
    Progress: {
        LaunchWebserver: "Web-Server starten…",
        LaunchChromium: "Chromium-Browser starten…",
        ConversionStarting: "Die Konvertierung der Datei zum {0}-Typ wird gestartet…",
        ResolveFileName: "Ziel-Pfad bestimmen…",
        WriteHTML: "HTML-Datei generieren und schreiben…",
        Scrape: "Dateien und Ressourcen abrufen…",
        ScrapeFolder: "Abgerufene Dateien und Ressourcen in den Ziel-Ordner verschieben…",
        ChromiumPage: "Website in Chromium öffnen…",
        PDF: "PDF-Datei generieren…",
        Screenshot: "Screenshot aufnehmen…",
        ConverterFinished: "Die Konvertierung der {0}-Datei wurde erfolgreich abgeschlossen",
        SearchDocuments: "Markdown-Dokumente werden gesucht…",
        DocumentsFound: "{0} Markdown-Dokumente wurden gefunden",
        CollectionStep: "Dokument {0} von {1} wird konvertiert…",
        ChainDocuments: "Dokumente verketten…"
    },
    TaskTitle: {
        Convert: "Dokument Konvertieren",
        ConvertAll: "Alle Dokumente Konvertieren",
        Chain: "Alle Dokumente Verketten"
    },
    DateTime: {
        Era: {
            Before: "v. Chr.",
            After: "n. Chr."
        },
        DateSeparator: ".",
        Formats: {
            Default: "dd/MM/yyyy",
            FullDate: "dddd, d. MMMM yyyy"
        },
        DaysOfWeek: {
            ShortNames: [
                "Mo",
                "Di",
                "Mi",
                "Do",
                "Fr",
                "Sa",
                "So"
            ],
            FullNames: [
                "Montag",
                "Dienstag",
                "Mittwoch",
                "Donnerstag",
                "Freitag",
                "Samstag",
                "Sonntag"
            ]
        },
        Months: {
            ShortNames: [
                "Jan",
                "Feb",
                "Mär",
                "Apr",
                "Mai",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Okt",
                "Nov",
                "Dez"
            ],
            FullNames: [
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember"
            ]
        },
        TimeDesignator: {
            ShortNames: [
                "v",
                "n"
            ],
            FullNames: [
                "vorm.",
                "nachm."
            ]
        }
    }
};
