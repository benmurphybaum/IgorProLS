import { CompletionList } from "vscode-languageserver";
import { CompletionItem } from "vscode-languageserver";
import { CompletionParams } from "vscode-languageserver";

import CompletionSources from "../completionSources/CompletionSources";

export const sources: CompletionSources = new CompletionSources();

function getFirstWord(str: string): string | null {
    const match = str.match(/^\S+/);
    return match ? match[0] : null;
}

function whichOperation(possibleOperation: string): CompletionItem | undefined {
    return sources.operations.find(item => item.label.toLowerCase() === possibleOperation.toLowerCase());
}

export const completion = (lineToCursor: string, prefix: string, params: CompletionParams): CompletionList => {
    let options = []
    // Filter the options for if the contain the prefix
    const firstWord = getFirstWord(lineToCursor)
    if (firstWord === null)
    {
        return {
            isIncomplete: false,
            items: sources.all.filter(item => item.label.toLowerCase().includes(prefix.toLowerCase()))
        }
    }

    const theOperation = whichOperation(firstWord)
    if (theOperation !== undefined)
    {
        options = sources.noOperations.filter(item => item.label.toLowerCase().includes(prefix.toLowerCase()))

        const result = sources.operationKeywords.get(theOperation.label.toLowerCase())
        if (result)
        {
            options = options.concat(result)
        }
    }
    else if (lineToCursor === prefix)
    {
        // This is the first word, so all options possible
        options = sources.all.filter(item => item.label.toLowerCase().includes(prefix.toLowerCase()))
    }
    else
    {
        // Not the first word, so no operations are valid
        options = sources.noOperations.filter(item => item.label.toLowerCase().includes(prefix.toLowerCase()))
    }

    return {
        isIncomplete: true,
        items: options,
    }
}

		