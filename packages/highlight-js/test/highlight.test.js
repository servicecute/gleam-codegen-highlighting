import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

import HighlightJS from "highlight.js/lib/core";

import {
  highlightGleamCodegen,
  overlayCodegenAnnotations,
  registerGleam,
} from "../src/index.js";

const fixtureRoot = fileURLToPath(new URL("../../../fixtures/", import.meta.url));

const source = `/// @codegen json
/// @json content_key "data"
/// @field user_id rename "userId"
/// @constructor User rename "user"
/// This is **ordinary Markdown** and @not_codegen text.
pub type User {
  User(user_id: String)
}
`;

test("highlights codegen markers and typed annotation values", () => {
  const result = highlightGleamCodegen(source);

  assert.match(result.value, /hljs-codegen-marker[^>]*>@codegen<\/span>/);
  assert.match(result.value, /hljs-codegen-namespace[^>]*>json<\/span>/);
  assert.match(result.value, /hljs-codegen-key[^>]*>content_key<\/span>/);
  assert.match(result.value, /hljs-codegen-string[^>]*>&quot;data&quot;<\/span>/);
  assert.match(result.value, /hljs-codegen-field[^>]*>user_id<\/span>/);
  assert.match(result.value, /hljs-codegen-constructor[^>]*>User<\/span>/);
});

test("leaves unknown directives and ordinary at text readable", () => {
  const result = highlightGleamCodegen(
    "/// @unknown directive\n/// ordinary @text remains comment text\n",
  );

  assert.doesNotMatch(result.value, /hljs-codegen-marker/);
  assert.match(result.value, /@unknown directive/);
  assert.match(result.value, /ordinary @text remains comment text/);
});

test("preserves official Gleam highlighting outside comments", () => {
  const result = highlightGleamCodegen("pub fn greet(name: String) { name }\n");

  assert.match(result.value, /hljs-keyword[^>]*>pub<\/span>/);
  assert.match(result.value, /hljs-title[^>]*>greet<\/span>/);
  assert.doesNotMatch(result.value, /hljs-codegen-/);
});

test("does not double-escape existing Highlight.js HTML", () => {
  const html = '<span class="hljs-comment">/// @json example "&lt;data&gt;"</span>';

  assert.equal(
    overlayCodegenAnnotations(html),
    '<span class="hljs-comment">/// <span class="hljs-codegen-marker hljs-meta">@json</span> <span class="hljs-codegen-key hljs-attr">example</span> <span class="hljs-codegen-string hljs-string">"&lt;data&gt;"</span></span>',
  );
});

test("supports an isolated Highlight.js instance", () => {
  const engine = HighlightJS.newInstance();

  registerGleam(engine);
  const result = highlightGleamCodegen("/// @codegen json\n", { engine });

  assert.match(result.value, /hljs-codegen-marker/);
  assert.equal(engine.getLanguage("gleam").name, "Gleam");
});

test("covers the shared valid annotation fixture", () => {
  const fixture = readFileSync(`${fixtureRoot}valid-annotations.gleam`, "utf8");
  const result = highlightGleamCodegen(fixture);

  assert.match(result.value, /hljs-codegen-value[^>]*>camelCase<\/span>/);
  assert.match(result.value, /hljs-codegen-namespace[^>]*>json<\/span>/);
  assert.match(result.value, /hljs-codegen-marker[^>]*>@firestore<\/span>/);
  assert.match(result.value, /hljs-codegen-number[^>]*>42<\/span>/);
});

test("covers the shared fail-soft fixture", () => {
  const fixture = readFileSync(`${fixtureRoot}fail-soft.gleam`, "utf8");
  const result = highlightGleamCodegen(fixture);

  assert.doesNotMatch(result.value, /hljs-codegen-marker[^>]*>@unknown/);
  assert.match(result.value, /@unknown future_directive/);
  assert.match(result.value, /Ordinary Markdown/);
});
