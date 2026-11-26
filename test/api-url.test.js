import process from "node:process";
import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveConfig } from "vite";

const variable = "VITE_API_URL";
const key = "import.meta.env.VITE_API_URL";

function setApiUrl(t, value) {
  const previous = process.env[variable];
  process.env[variable] = value;
  t.after(() => {
    if (previous === undefined) delete process.env[variable];
    else process.env[variable] = previous;
  });
}

test("Vite injects the configured API URL for production builds", async (t) => {
  const apiUrl = "https://api.example.invalid/api";
  setApiUrl(t, apiUrl);
  const config = await resolveConfig({}, "build", "production");
  assert.equal(config.define[key], JSON.stringify(apiUrl));
});

test("Vite keeps the default API URL in local development", async (t) => {
  setApiUrl(t, "");
  const config = await resolveConfig({}, "serve", "development");
  assert.equal(config.define[key], JSON.stringify("http://localhost:3000/api"));
});

test("production builds reject missing and malformed API URLs", async (t) => {
  setApiUrl(t, "");
  await assert.rejects(resolveConfig({}, "build", "production"), /VITE_API_URL is required/);

  process.env[variable] = "ftp://api.example.invalid/api";
  await assert.rejects(resolveConfig({}, "build", "production"), /absolute HTTP\(S\) URL/);
});
