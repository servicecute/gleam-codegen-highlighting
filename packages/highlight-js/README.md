# Highlight.js adapter

Optional Highlight.js integration for generated documentation. It composes
with the official Gleam grammar and adds codegen scopes only inside recognized
documentation comments.

## Install

```sh
npm install @servicecute/gleam-codegen-highlightjs
```

## Usage

```js
import { highlightGleamCodegen } from
  "@servicecute/gleam-codegen-highlightjs";

const result = highlightGleamCodegen(`/// @codegen json
/// @json content_key "data"
pub type User { User(id: String) }
`);

document.querySelector("code").innerHTML = result.value;
```

The result follows Highlight.js' result shape. It preserves the official
Gleam output and adds these semantic classes:

| Concept | Class |
| --- | --- |
| Annotation marker | `hljs-codegen-marker` |
| Format namespace | `hljs-codegen-namespace` |
| Directive key | `hljs-codegen-key` |
| Generic annotation value | `hljs-codegen-value` |
| Quoted annotation value | `hljs-codegen-string` |
| Numeric annotation value | `hljs-codegen-number` |
| Field name | `hljs-codegen-field` |
| Constructor name | `hljs-codegen-constructor` |

Unknown and malformed annotations remain ordinary comment text. The adapter
does not validate codegen semantics; that remains the responsibility of
`lib_codegen`.

## Custom Highlight.js instance

```js
import HighlightJS from "highlight.js/lib/core";
import { highlightGleamCodegen } from
  "@servicecute/gleam-codegen-highlightjs";

const engine = HighlightJS.newInstance();
const result = highlightGleamCodegen(source, { engine });
```

See the root repository fixtures and the canonical
[`lib_codegen` contract](https://github.com/servicecute/gleam-workspace/blob/master/lib_codegen/docs/codegen-comment-syntax-highlighting-extension.md)
for the supported annotation vocabulary.
