// The MCP tool handlers are bundled into a Deno edge function where `process.env`
// is available at runtime. Declare the shape here so the app's TypeScript
// (which doesn't include @types/node) accepts it.
declare const process: { env: Record<string, string | undefined> };
