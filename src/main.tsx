import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import "./index.css";
import "highlight.js/styles/tokyo-night-dark.min.css";

Sentry.init({
  dsn: "https://70aa6d6bd66bb6adefddba3d717d17f6@sentry.baoge.dev/3",
});

createRoot(document.getElementById("root")!).render(<App />);
