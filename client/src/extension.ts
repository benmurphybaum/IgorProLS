import * as path from "path";
import { workspace, ExtensionContext, lm, McpStdioServerDefinition } from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join("server", "out", "server.js")
  );

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.stdio },
    debug: {
      module: serverModule,
      transport: TransportKind.stdio,
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for all documents by default
    documentSelector: [
      { scheme: "file", language: "igor" },
      { scheme: "file", language: "igorpro" },
    ],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher("**/.clientrc"),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "igorpro",
    "Igor Pro Language Server",
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();

  // Register the MCP server so it works in any workspace
  const mcpServerPath = context.asAbsolutePath(
    path.join("server", "out", "mcpServer.js")
  );
  context.subscriptions.push(
    lm.registerMcpServerDefinitionProvider("igorpro", {
      provideMcpServerDefinitions() {
        return [
          new McpStdioServerDefinition(
            "Igor Pro",
            "node",
            [mcpServerPath]
          ),
        ];
      },
    })
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
