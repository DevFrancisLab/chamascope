import { NextRequest } from "next/server";

const INTERESTING_HEADERS = [
  "content-type",
  "content-length",
  "server",
  "cache-control",
  "set-cookie",
  "content-security-policy",
  "permissions-policy",
  "strict-transport-security",
  "x-frame-options",
  "x-content-type-options",
  "ratelimit-limit",
  "ratelimit-remaining",
  "cf-ray",
];

export async function POST(req: NextRequest) {
  let url: string;
  try {
    const body = await req.json();
    url = String(body.url ?? "");
    new URL(url);
  } catch {
    return Response.json(
      { ok: false, status: 0, latencyMs: 0, headers: {}, error: "invalid url" },
      { status: 400 },
    );
  }

  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "text/html,application/json,*/*",
        "user-agent":
          "ChamaScope/0.1 (audit tool; +https://chamascope.example)",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const latencyMs = Date.now() - start;

    const headers: Record<string, string> = {};
    for (const name of INTERESTING_HEADERS) {
      const v = res.headers.get(name);
      if (v) headers[name] = v;
    }

    let bodySnippet: string | undefined;
    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("json") || ct.includes("text")) {
      const text = await res.text();
      bodySnippet = text.slice(0, 1500);
    }

    return Response.json({
      ok: res.ok,
      status: res.status,
      latencyMs,
      headers,
      bodySnippet,
    });
  } catch (e) {
    return Response.json({
      ok: false,
      status: 0,
      latencyMs: Date.now() - start,
      headers: {},
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
