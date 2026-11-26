import assert from "node:assert/strict";
import process from "node:process";
import { test } from "node:test";
import { build } from "vite";
import { eventBannerUrl } from "../src/lib/eventBannerUrl.js";

const mediaDirectory = "https://media.example.invalid/uploads/events";
const fallback = eventBannerUrl("", "");

test("complete banner URLs and asset-service paths resolve without a localhost default", () => {
  const hosted = "https://cdn.example.invalid/public/banner.jpg?size=large";
  assert.equal(eventBannerUrl(hosted, ""), hosted);
  assert.equal(eventBannerUrl("Main Banner.jpg", mediaDirectory), mediaDirectory + "/Main%20Banner.jpg");
  assert.equal(eventBannerUrl("/events/2026/banner.jpg", mediaDirectory), "https://media.example.invalid/events/2026/banner.jpg");
  assert.equal(eventBannerUrl("banner.jpg", "http://localhost:5000/uploads/events/"),
    "http://localhost:5000/uploads/events/banner.jpg");
});

test("missing, placeholder and unsupported banner values use the fallback", () => {
  assert.equal(eventBannerUrl("banner.jpg", ""), fallback);
  assert.equal(eventBannerUrl("banner.jpg", "invalid-base"), fallback);
  for (const banner of [undefined, "", "test.jpg", "javascript:alert(1)", "//unknown.example.invalid/banner.jpg"]) {
    assert.equal(eventBannerUrl(banner, mediaDirectory), fallback);
  }
});

test("the production bundle uses the configured banner directory without the legacy localhost URL", async (t) => {
  for (const [key, value] of Object.entries({
    VITE_API_URL: "https://api.example.invalid/api",
    VITE_EVENT_BANNER_BASE_URL: mediaDirectory,
  })) {
    const previous = process.env[key];
    process.env[key] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }

  for (const directory of [mediaDirectory, ""]) {
    process.env.VITE_EVENT_BANNER_BASE_URL = directory;
    const result = await build({ mode: "production", build: { write: false }, logLevel: "silent" });
    const code = result.output.filter((asset) => asset.type === "chunk").map((chunk) => chunk.code).join("\n");
    assert.equal(code.includes(mediaDirectory), Boolean(directory));
    assert.doesNotMatch(code, /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/uploads\/events\//i);
  }
});
