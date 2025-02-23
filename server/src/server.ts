import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
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

connection.onCompletion((params: CompletionParams): CompletionList | null => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc)
  {
    return null;
  }

  // Getting the current line and word of the document lets us provide completion context
  const content = doc.getText();
  const currentLine = content.split("\n")[params.position.line];
  const lineUntilCursor = currentLine.slice(0, params.position.character).trimStart();
  const currentWord = lineUntilCursor.replace(/.*\W(.*)/, "$1");
  
  return completion(lineUntilCursor, currentWord, params);
});

documents.onDidChangeContent((change) => {

  // connection.window.showInformationMessage(
  //   "onDidChangeContent: " + change.document.uri
  // );
});


// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
