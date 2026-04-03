---
name: Igor Pro Documentation Lookup
description: Instructs Copilot to always use the igorpro_search_documentation MCP tool when answering Igor Pro questions.
---

When answering any question about Igor Pro — including functions, operations, syntax, keywords, wave types, data folders, graphing, analysis, Python integration, or any other Igor Pro topic — follow this process:

1. If you are unsure of the exact name of an operation or function, ALWAYS call `igorpro_find_operations` first to search the local command index for the canonical name (e.g. query "violin plot" to find "AppendViolinPlot").
2. Then call `igorpro_search_documentation` using the exact canonical name(s) returned by step 1.

Do not rely on training knowledge for Igor Pro specifics. Do not skip step 1 when the exact operation name is uncertain.
