import defaultHighlightJs from "highlight.js/lib/core";
import gleam from "@gleam-lang/highlight.js-gleam";

import { overlayCodegenAnnotations } from "./overlay.js";

/**
 * Register the official Gleam grammar on a Highlight.js instance when it is
 * not already registered.
 */
export function registerGleam(engine = defaultHighlightJs, language = "gleam") {
  if (!engine.getLanguage(language)) {
    engine.registerLanguage(language, gleam);
  }

  return engine;
}

/**
 * Highlight Gleam source and overlay codegen scopes inside documentation
 * comments. The returned object follows Highlight.js' result shape.
 */
export function highlightGleamCodegen(
  source,
  { engine = defaultHighlightJs, language = "gleam" } = {},
) {
  registerGleam(engine, language);
  const result = engine.highlight(source, {
    language,
    ignoreIllegals: true,
  });

  return {
    ...result,
    value: overlayCodegenAnnotations(result.value),
  };
}

export { overlayCodegenAnnotations };
