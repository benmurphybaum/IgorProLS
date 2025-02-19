import { CompletionItem } from "vscode-languageserver";

export const operationKeywordMap: Map<string, CompletionItem[]> = new Map()

const PythonItems: CompletionItem[] = [
    { label: 'execute', kind: 5},
    { label: 'array', kind: 5 },
    { label: 'var', kind: 5},
  ];
operationKeywordMap.set("python", PythonItems)

const PythonFileItems: CompletionItem[] = [
    { label: 'file', kind: 5},
    { label: 'array', kind: 5},
    { label: 'var', kind: 5},
    { label: 'args', kind: 5},
  ];
operationKeywordMap.set("pythonfile", PythonFileItems)