import { CompletionList } from "vscode-languageserver";
import { CompletionItem } from "vscode-languageserver";
import { CompletionParams } from "vscode-languageserver";

export const completion = (params: CompletionParams): CompletionList => {
    return {
        isIncomplete: false,
        items: [
            {label: "StringFromList"},
            {label: "StringByKey"},
            {label: "Print"}
        ]
    }
}