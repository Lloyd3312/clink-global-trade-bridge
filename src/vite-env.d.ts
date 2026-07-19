/// <reference types="vite/client" />

// MCP tool handlers are bundled into a Deno edge function where `process.env` is
// available at runtime. Declare its shape here so the app's TypeScript accepts it.
declare const process: { env: Record<string, string | undefined> };
