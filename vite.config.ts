import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";
import { md } from "./src/lib/utils";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
  },
  plugins: [
    react(),
    mdPlugin({
      mode: [Mode.MARKDOWN],
      markdown: (body) => {
        const rendered = md.render(body);
        // console.log(rendered);
        return rendered;
      },
    }),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,

      // Auth tokens can be obtained from https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
