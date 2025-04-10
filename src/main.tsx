import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "highlight.js/styles/tokyo-night-dark.min.css";

createRoot(document.getElementById("root")!).render(<App />);
