import { CompletionList } from "vscode-languageserver";
import { CompletionItem } from "vscode-languageserver";
import { CompletionParams } from "vscode-languageserver";
import { operationList } from "../completionSources/Operations";
import { numericFunctionsList } from "../completionSources/Functions";
import { stringFunctionList } from "../completionSources/Functions";
import { keywordList } from "../completionSources/Keywords";
import { operationKeywordMap } from "../completionSources/OperationKeywords";

const completionList: CompletionItem[] = operationList.concat(keywordList);
const noOperationList: CompletionItem[] = keywordList;

function getFirstWord(str: string): string | null {
    const match = str.match(/^\S+/);
    return match ? match[0] : null;
  }

function whichOperation(possibleOperation: string): CompletionItem | undefined {
    return operationList.find(item => item.label.toLowerCase() === possibleOperation.toLowerCase());
}

export const completion = (lineToCursor: string, prefix: string, params: CompletionParams): CompletionList => {
    let options = []
    // Filter the options for if the contain the prefix
    const firstWord = getFirstWord(lineToCursor)
    if (firstWord === null)
    {
        return {
            isIncomplete: false,
            items: completionList.filter(item => item.label.toLowerCase().includes(prefix.toLowerCase()))
        }
    }

    const theOperation = whichOperation(firstWord)
    if (theOperation !== undefined)
    {
        options = noOperationList.filter(item => item.label.toLowerCase().includes(prefix.toLowerCase()))

        const result = operationKeywordMap.get(theOperation.label.toLowerCase())
        if (result)
        {
            options = options.concat(result)
        }
    }
    else if (lineToCursor === prefix)
    {
        // This is the first word, so all options possible
        options = completionList.filter(item => item.label.toLowerCase().includes(prefix.toLowerCase()))
    }
    else
    {
        // Not the first word, so no operations are valid
        options = noOperationList.filter(item => item.label.toLowerCase().includes(prefix.toLowerCase()))
    }

   
    return {
        isIncomplete: false,
        items: options,
    }
}

		