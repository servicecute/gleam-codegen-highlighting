export const FORMAT_NAMESPACES = new Set(["json", "msgpack", "firestore"]);

export const ANNOTATION_MARKERS = new Set([
  "codegen",
  "rename_all",
  "tag",
  "tag_value",
  "tag_casing",
  "deny_unknown",
  "skip_if_null",
  "newtype",
  "extern",
  "encode",
  "decode",
  "version",
  "changelog",
  "json",
  "msgpack",
  "firestore",
  "field",
  "constructor",
]);

export const DIRECTIVE_KEYS = new Set([
  "rename",
  "skip",
  "skip_if_null",
  "keep_null",
  "default",
  "example",
  "with",
  "flatten",
  "content_key",
  "tag_style",
]);

export const SEMANTIC_SCOPES = Object.freeze({
  marker: "hljs-codegen-marker",
  namespace: "hljs-codegen-namespace",
  key: "hljs-codegen-key",
  value: "hljs-codegen-value",
  string: "hljs-codegen-string",
  number: "hljs-codegen-number",
  field: "hljs-codegen-field",
  constructor: "hljs-codegen-constructor",
});

export const HIGHLIGHT_JS_SCOPES = Object.freeze({
  [SEMANTIC_SCOPES.marker]: "hljs-meta",
  [SEMANTIC_SCOPES.namespace]: "hljs-built_in",
  [SEMANTIC_SCOPES.key]: "hljs-attr",
  [SEMANTIC_SCOPES.value]: "hljs-literal",
  [SEMANTIC_SCOPES.string]: "hljs-string",
  [SEMANTIC_SCOPES.number]: "hljs-number",
  [SEMANTIC_SCOPES.field]: "hljs-variable",
  [SEMANTIC_SCOPES.constructor]: "hljs-title",
});
