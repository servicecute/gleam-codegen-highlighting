# Gleam Codegen Highlighting - Tasks

## Metadata

- **Last updated**: 2026-11-13
- **Active milestone**: Highlight.js adapter foundation
- **Source of truth**: The codegen contract in `gleam-workspace/lib_codegen`

## Active Tasks

### P0 — Blockers

- [ ] `CONTRACT-1` Extract the host-neutral annotation and semantic-scope contract into a versioned machine-readable format.
- [ ] `CONTRACT-2` Define the shared fixture format, expected tokens, malformed-input behavior, and compatibility policy.
- [ ] `RELEASE-1` Add CI that runs contract, fixture, and every implemented adapter test before publishing.

### P1 — Must-Have (current release)

- [ ] `HJ-8` Add a generated-documentation integration example and verify the rendered HTML.
- [ ] `HJ-10` Pin and periodically review the official Gleam grammar and Highlight.js compatibility versions.

### P2 — Post-MVP / Near-Term

- [ ] `FIXTURE-1` Export the canonical fixture corpus from `lib_codegen` into this repository or consume a versioned artifact without duplicating the source of truth.
- [ ] `FIXTURE-2` Add fixture conformance checks so every adapter reports missing or unexpected semantic tokens.
- [ ] `VS-1` Create the VS Code companion extension package.
- [ ] `VS-2` Implement a TextMate injection grammar targeting `source.gleam` documentation-comment scopes.
- [ ] `VS-3` Verify normal files, staged diffs, unstaged diffs, inline diffs, and side-by-side diffs.
- [ ] `VS-4` Add VS Code packaging, extension tests, and marketplace metadata.
- [ ] `DIFF-1` Define the language-aware terminal diff contract: identify source path, strip patch prefixes, highlight source, then apply diff styling.
- [ ] `WARP-1` Confirm Warp's supported custom grammar/configuration boundary and issue #7559 contribution requirements.
- [ ] `WARP-2` Prototype a Warp adapter using the shared Gleam and codegen fixtures.
- [ ] `WARP-3` Submit a generic custom-language or grammar-extension proposal upstream when the API boundary is understood.
- [ ] `TREE-1` Add a Tree-sitter query/injection implementation for consumers that can load custom queries.
- [ ] `HTML-1` Integrate the adapter with the workspace codegen specification HTML and workspace documentation renderer.
- [ ] `HTML-2` Add light/dark theme examples without hard-coding host-specific colors into semantic scopes.

### P3 — Backlog / Strategic

- [ ] `UPSTREAM-1` Propose generic codegen-comment injection support to the official Gleam editor ecosystem once the vocabulary is stable.
- [ ] `UPSTREAM-2` Evaluate upstreaming generic portions to `gleam-highlight.js` without making codegen a required dependency.
- [ ] `UPSTREAM-3` Evaluate upstreaming generic portions to `vscode-gleam` after companion-extension compatibility is proven.
- [ ] `WARP-4` Maintain a small personal Warp patch branch only for unupstreamable daily-use UX changes.
- [ ] `VERSION-1` Define semver rules for syntax-scope additions, removals, and host adapter compatibility.
- [ ] `VERSION-2` Publish release notes that distinguish contract changes from adapter-only changes.
- [ ] `PERF-1` Benchmark highlighting large generated documentation pages and establish regression thresholds.
- [ ] `SECURITY-1` Review HTML output and package usage for safe escaping and supply-chain risks.
- [ ] `DX-1` Add examples for bundlers, Node, browser ESM, and server-rendered documentation.

## Completed

- [x] `REPO-1` Create the public `servicecute/gleam-codegen-highlighting` repository with MIT licensing and adapter directories. *(completed 2026-11-13)*
- [x] `REPO-2` Add repository README, package layout, and links to the canonical `lib_codegen` contract. *(completed 2026-11-13)*
- [x] `HJ-1–HJ-7` Implement and test the Highlight.js adapter foundation. *(completed 2026-11-13)*
- [x] `HJ-9` Document the Highlight.js package API, semantic scopes, and limitations. *(completed 2026-11-13)*

## Agent Execution Board

| task_id | priority | owner | target_date | dependencies | status |
|---------|----------|-------|-------------|--------------|--------|
| `HJ-1–HJ-7, HJ-9` | P1 | codex:gpt-5.6-luna | 2026-11-13 | `CONTRACT-1`, `CONTRACT-2` | completed |

## History

### Repository bootstrap (completed 2026-11-13)

Created the standalone repository, MIT license, host adapter directories, and
the initial README. The next implementation milestone starts with the
Highlight.js adapter because it supports generated HTML and documentation first.
