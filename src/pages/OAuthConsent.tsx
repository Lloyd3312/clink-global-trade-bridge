import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";

// The @supabase/supabase-js `auth.oauth` namespace is in beta; type it locally
// so we can call it without touching node_modules.
type OAuthClient = { name?: string; client_name?: string; redirect_uri?: string; redirect_uris?: string[] };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
};
const oauthApi = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      setEmail(sess.session.user.email ?? null);
      const { data, error } = await oauthApi.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauthApi.approveAuthorization(authorizationId)
      : await oauthApi.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authorization error</CardTitle>
            <CardDescription>We could not load this authorization request.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{error}</CardContent>
        </Card>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const clientName = details.client?.name ?? details.client?.client_name ?? "an app";
  const scopes = details.scopes ?? (details.scope ? details.scope.split(/\s+/).filter(Boolean) : []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-br from-secondary/40 to-background">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Connect {clientName} to Clink Global</CardTitle>
          <CardDescription>
            {clientName} will be able to call this app's enabled tools while you are signed in{email ? ` as ${email}` : ""}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4 text-sm space-y-2">
            <div className="font-medium">This will let {clientName}:</div>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Search our published product catalog</li>
              <li>Browse real-estate listings</li>
              <li>List, look up, and create quote requests on your behalf</li>
            </ul>
            {scopes.length > 0 && (
              <div className="text-xs text-muted-foreground pt-2">Requested scopes: {scopes.join(", ")}</div>
            )}
            <div className="text-xs text-muted-foreground pt-2">
              This does not bypass this app's permissions or backend policies.
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" disabled={busy} onClick={() => decide(false)}>
              Cancel
            </Button>
            <Button variant="cta" disabled={busy} onClick={() => decide(true)}>
              {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Approve
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
