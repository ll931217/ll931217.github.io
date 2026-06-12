// PROTOTYPE — registry of home page variants for the awwwards-redesign
// exploration. `Component: undefined` means "render the unmodified current
// home page". New variants are appended here as they are built.
import { ComponentType, lazy } from "react";
import { HomeVariantProps } from "./types";

export interface PrototypeVariantDef {
  key: string;
  name: string;
  Component?: ComponentType<HomeVariantProps>;
}

export const HOME_VARIANTS: PrototypeVariantDef[] = [
  { key: "current", name: "night sidebar (current)" },
  {
    key: "editorial",
    name: "kinetic editorial (GSAP)",
    Component: lazy(() => import("./VariantEditorial")),
  },
  {
    key: "webgl",
    name: "webgl depth (Three.js)",
    Component: lazy(() => import("./VariantWebgl")),
  },
];
