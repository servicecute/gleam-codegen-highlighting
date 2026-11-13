# Gleam Codegen Highlighting

Portable syntax-highlighting adapters for codegen annotations embedded in
Gleam documentation comments.

This project keeps codegen-aware highlighting separate from the official Gleam
language grammars. A normal Gleam compiler, editor, or terminal should still
read codegen annotations as ordinary documentation comments when this project
is not installed.

## Status

The repository is being bootstrapped. The canonical syntax contract and
initial fixture corpus are maintained by
[`lib_codegen`](https://github.com/servicecute/gleam-workspace/tree/master/lib_codegen).
Adapters will be added here as their host contracts become clear.

## Goals

- provide one semantic vocabulary for codegen annotations;
- preserve official Gleam highlighting and Markdown behavior;
- support generated HTML, VS Code, Git diffs, and Warp integrations;
- fail softly for unknown or malformed annotations;
- test every host adapter against the same fixtures;
- avoid coupling codegen semantics to one editor or terminal.

## Non-goals

- replacing the official Gleam parser or language grammar;
- validating codegen annotations in an editor grammar;
- making editor integrations required at runtime;
- embedding workspace-specific business models in a host adapter.

## Repository layout

```text
spec/
  Versioned syntax and scope contract.
fixtures/
  Cross-host examples and expected recognition cases.
packages/
  highlight-js/  Generated documentation and web highlighting.
  vscode/        VS Code TextMate or Tree-sitter integration.
  warp/          Warp integration and experiments.
docs/
  Adapter design, compatibility, and contribution notes.
```

## Canonical contract

The source of truth for codegen semantics remains the Gleam workspace:

- [Codegen highlighting extension specification](https://github.com/servicecute/gleam-workspace/blob/master/lib_codegen/docs/codegen-comment-syntax-highlighting-extension.md)
- [Codegen library](https://github.com/servicecute/gleam-workspace/tree/master/lib_codegen)

This repository owns host integrations. It must not silently redefine
directive names, scope meanings, or malformed-input behavior. Contract changes
should be versioned and reflected in the shared fixtures before adapters are
updated.

## Planned adapters

### Highlight.js

An optional grammar layer for generated documentation and web pages. It should
compose with the official Gleam grammar and add codegen scopes only inside
recognized documentation comments.

### VS Code

A companion injection grammar targeting the official Gleam language mode. It
should work in normal source files and both sides of the VS Code diff editor.

### Warp

A host adapter or upstream contribution once Warp's custom grammar boundary is
confirmed. The generic request is tracked in [Warp issue #7559](https://github.com/warpdotdev/warp/issues/7559).
Warp-specific behavior must remain optional and must not become part of the
canonical codegen contract.

## Development principles

1. Add or change a fixture before changing an adapter.
2. Keep semantic scopes stable across hosts.
3. Prefer host-native theme scopes over hard-coded colors.
4. Preserve Markdown, quoted strings, and JSON-like examples in comments.
5. Treat unknown directives as readable comments.
6. Keep generated artifacts reviewable and reproducible.

## Contribution workflow

1. Read the canonical contract in `lib_codegen`.
2. Add representative fixtures for the behavior.
3. Implement the smallest host-specific adapter.
4. Run the adapter's tests and the shared fixture checks.
5. Document host limitations and manual verification steps.

For changes to the codegen vocabulary itself, update `lib_codegen` first and
then consume the versioned contract here.

## License

MIT. See [LICENSE](LICENSE).
