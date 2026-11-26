import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ command, mode, isPreview }) => {
  const env = loadEnv(mode, projectRoot, "VITE_");
  const configuredUrl = env.VITE_API_URL?.trim();

  if ((command === "build" || mode === "production") && !isPreview && !configuredUrl) {
    throw new Error("VITE_API_URL is required for a production build");
  }

  const apiUrl = configuredUrl || "http://localhost:3000/api";
  const url = URL.parse(apiUrl);
  if (!url || !["http:", "https:"].includes(url.protocol) ||
      url.username || url.password || url.search || url.hash) {
    throw new Error("VITE_API_URL must be an absolute HTTP(S) URL without credentials, a query, or a fragment");
  }

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(url.href),
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
