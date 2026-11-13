# Specification

This directory contains the versioned, host-neutral highlighting contract.

The contract should define:

- annotation markers and namespaces;
- directive and value scopes;
- recognition boundaries inside Gleam documentation comments;
- malformed-input behavior;
- compatibility/versioning rules.

Until the first machine-readable contract is extracted, the authoritative
source is the `lib_codegen` specification in the Gleam workspace.
