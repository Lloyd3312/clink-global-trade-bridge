# Integration architecture
- Author remote MCP tools in `src/lib/mcp/`, one definition per file; the Vite plugin owns the generated function to avoid transport drift.
- Use the shared lazy caller-scoped client for every authenticated MCP database operation so OAuth identity and existing RLS remain authoritative.
- Canonicalize sign-in return paths through the shared helper so all login methods preserve safe consent requests.
- Register browser tools in their visible screen components and wrap execution in the shared telemetry helper; tools disappear on unmount and never record user content.