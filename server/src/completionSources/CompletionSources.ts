import { CompletionItem } from "vscode-languageserver";
import * as fs from "fs";
import * as path from "path";

class CompletionSources 
{
    keywords: CompletionItem[];
    functions: CompletionItem[];
    operations: CompletionItem[];
    operationKeywords:  Map<string, CompletionItem[]>;
  
    all: CompletionItem[];
    noOperations: CompletionItem[];

    constructor() 
    {
        this.keywords = [];
        this.functions = [];
        this.operations = [];
        this.operationKeywords = new Map();
        this.all = [];
        this.noOperations = [];

        this.loadCommandHelp();
        this.loadOperationKeywords();
        this.loadKeywords();
        
        this.all = this.operations.concat(this.functions, this.keywords);
        this.noOperations = this.functions.concat(this.keywords);
    }

    private loadCommandHelp(): void
    {
        const projectRoot = path.resolve(__dirname, "../..");
        const commandHelpPath = path.join(projectRoot, "src/completionSources/CommandHelp.txt");

        const text = fs.readFileSync(commandHelpPath, "utf-8");
        const lines: string[] = text.split("\n");

        lines.forEach((line, index) => {
            const tokens = line.split("::");

            if (tokens.length == 3)
            {
                const type: string = tokens[0];
                const operation: string = tokens[1];
                const tooltip: string = tokens[2];

                switch (type)
                {
                    case "Function":
                    {
                        if (tooltip.trim().length == 0)
                        {
                            this.functions.push({label: operation, kind: 3});
                        }
                        else
                        {
                            this.functions.push({label: operation, kind: 3, detail: tooltip});
                        }
                        break;
                    }
                    case "Operation":
                    {
                        if (tooltip.trim().length == 0)
                        {
                            this.operations.push({label: operation, kind: 3});
                        }
                        else
                        {  
                            this.operations.push({label: operation, kind: 3, detail: tooltip});
                        }
                        break;
                    }
                }
            }
        });
    }

    private loadOperationKeywords(): void
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
            
            const keywords = this.operationKeywords.get(operation.toLowerCase()) || [];
            keywords.push(item);
            this.operationKeywords.set(operation.toLowerCase(), keywords);
            }
        });
    }

    private loadKeywords(): void
    {
        this.keywords = [
            {label: "for", kind: 14},
            {label: "endfor", kind: 14},
            {label: "if", kind: 14},
            {label: "else", kind: 14},
            {label: "elseif", kind: 14},
            {label: "endif", kind: 14},
            {label: "do", kind: 14},
            {label: "while", kind: 14},
            {label: "switch", kind: 14},
            {label: "strswitch", kind: 14},
            {label: "endswitch", kind: 14},
            {label: "case", kind: 14},
            {label: "default", kind: 14},
            {label: "break", kind: 14},
            {label: "try", kind: 14},
            {label: "catch", kind: 14},
            {label: "endtry", kind: 14},
            {label: "#pragma", kind: 14},
            {label: "#if", kind: 14},
            {label: "#endif", kind: 14},
            {label: "#ifdef", kind: 14},
            {label: "#ifndef", kind: 14},
            {label: "#include", kind: 14},
            {label: "function", kind: 14},
            {label: "picture", kind: 14},
            {label: "macro", kind: 14},
            {label: "structure", kind: 14},
            {label: "end", kind: 14},
            {label: "endmacro", kind: 14},
            {label: "endstructure", kind: 14},
            {label: "proc", kind: 14},
            {label: "endproc", kind: 14},
            {label: "constant", kind: 14},
            {label: "strconstant", kind: 14},
        ];
        
    }
}
  
  export default CompletionSources;