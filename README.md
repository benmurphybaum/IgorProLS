# IgorProLS

This project aims to build a basic language server for the Igor Pro language, using the Igor Pro 10 operation/function set. You can build the project as a VS Code extension (.vsix) and install it locally using `Install from VSIX...` in the extensions marketplace. To build, open the project folder and run:

```
npx vsce package
```

Currently, the server allows basic statement completion and syntax highlighting for Igor symbols. It also registers an MCP server that fetches Igor documentation from WaveMetrics' documentation website (https://docs.wavemetrics.com). The MCP server is used with Copilot chat in VS Code.
