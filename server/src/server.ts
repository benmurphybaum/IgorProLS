import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  CompletionOptions,
  CompletionParams,
  CompletionList,
} from "vscode-languageserver/node";

import { TextDocument } from "vscode-languageserver-textdocument";
import { completion } from "./textDocument/completion";

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) => {
  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {},
    },
  };

  return result;
});

connection.onCompletion((params: CompletionParams): CompletionList => {
  return completion(params);
});

documents.onDidChangeContent((change) => {
  connection.window.showInformationMessage(
    "onDidChangeContent: " + change.document.uri
  );
});


// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
