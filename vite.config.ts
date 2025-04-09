import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";
import { md } from "./src/lib/utils";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
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
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
