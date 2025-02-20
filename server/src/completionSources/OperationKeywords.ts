import { CompletionItem } from "vscode-languageserver";
import * as fs from "fs";
import * as path from "path";

export const operationKeywordMap: Map<string, CompletionItem[]> = new Map()

function loadOperationKeywords()
{
  const projectRoot = path.resolve(__dirname, "../..");
  const operationKeywordPath = path.join(projectRoot, "src/completionSources/OperationKeywords.txt");
  
  const text = fs.readFileSync(operationKeywordPath, "utf-8");
  const lines: string[] = text.split("\n");

  lines.forEach((line, index) => {
    const tokens = line.split("::");

    if (tokens.length >= 2)
    {
      const operation: string = tokens[0];
      const keyword: string = tokens[1];
      var tooltip: string = '';
      if (tokens.length === 3)
      {
        tooltip = tokens[2];
      }
      
      const item: CompletionItem = {label: keyword, kind: 5, detail: tooltip};
      
      const keywords = operationKeywordMap.get(operation.toLowerCase()) || [];
      keywords.push(item);
      operationKeywordMap.set(operation.toLowerCase(), keywords);
    }
  });

}

loadOperationKeywords();
