import * as fs from "fs";
import * as path from "path";
import { operationList } from "./Operations";
import { functionList } from "./Functions";

export function loadCommandHelp()
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
                        functionList.push({label: operation, kind: 3});
                    }
                    else
                    {
                        functionList.push({label: operation, kind: 3, detail: tooltip});
                    }
                    break;
                }
                case "Operation":
                {
                    if (tooltip.trim().length == 0)
                    {
                        operationList.push({label: operation, kind: 3});
                    }
                    else{
                        operationList.push({label: operation, kind: 3, detail: tooltip});
                    }
                    break;
                }
            }
        }
    });
}
