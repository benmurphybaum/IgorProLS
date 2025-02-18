import { CompletionList } from "vscode-languageserver";
import { CompletionItem } from "vscode-languageserver";
import { CompletionParams } from "vscode-languageserver";
import { operationList } from "../completionSources/Operations";
import { numericFunctionsList } from "../completionSources/Functions";
import { stringFunctionList } from "../completionSources/Functions";
import { keywordList } from "../completionSources/Keywords";

const completionList: CompletionItem[] = operationList.concat(numericFunctionsList).concat(stringFunctionList).concat(keywordList);

export const completion = (prefix: string, params: CompletionParams): CompletionList => {
    return {
        isIncomplete: false,
        items: completionList,
    }
}

		