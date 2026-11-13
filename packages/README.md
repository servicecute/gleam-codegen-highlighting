# Host packages

Host packages adapt the shared contract to a particular highlighting system.
They must not redefine codegen semantics or require every host to install the
others.

- `highlight-js/` — generated HTML and web documentation.
- `vscode/` — companion editor grammar and diff-editor behavior.
- `warp/` — Warp integration, pending confirmation of its supported grammar
  extension boundary.
