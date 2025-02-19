import { CompletionList } from "vscode-languageserver";
import { CompletionItem } from "vscode-languageserver";
import { CompletionParams } from "vscode-languageserver";
import { operationList } from "../completionSources/Operations";
import { numericFunctionsList } from "../completionSources/Functions";
import { stringFunctionList } from "../completionSources/Functions";
import { keywordList } from "../completionSources/Keywords";

const completionList: CompletionItem[] = operationList.concat(numericFunctionsList).concat(stringFunctionList).concat(keywordList);
const noOperationList: CompletionItem[] = numericFunctionsList.concat(stringFunctionList).concat(keywordList)

function getFirstWord(str: string): string | null {
    const match = str.match(/^\S+/);
    return match ? match[0] : null;
  }

function whichOperation(possibleOperation: string): CompletionItem | undefined {
    return operationList.find(item => item.label === possibleOperation);
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

        if (theOperation.label === "Python")
        {
            options.push( {label: "execute", kind: 5}, {label: "var", kind: 5}, {label: "array", kind: 5}) // add the operation keywords
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

		