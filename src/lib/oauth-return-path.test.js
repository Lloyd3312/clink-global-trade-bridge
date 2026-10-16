import { describe, expect, test } from "bun:test";
import { oauthReturnPath } from "./oauth-return-path";

describe("OAuth return path", () => {
  test("preserves a local consent request including its query and fragment", () => {
    expect(oauthReturnPath("/.lovable/oauth/consent?authorization_id=request-123#return"))
      .toBe("/.lovable/oauth/consent?authorization_id=request-123#return");
  });
  test("rejects external and malformed return targets", () => {
    for (const path of ["https://outside.invalid", "//outside.invalid", "/\\outside.invalid", "/\nexternal", null]) {
      expect(oauthReturnPath(path)).toBe("/");
    }
  });
});