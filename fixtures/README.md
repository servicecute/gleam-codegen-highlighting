# Shared fixtures

Every adapter must consume the same examples. Fixtures should cover ordinary
Gleam comments, Markdown, valid codegen annotations, malformed annotations,
quoted values, JSON-like examples, and mixed annotation/comment content.

Add a fixture before changing an adapter. Expected semantic scopes should be
described without assuming a specific theme or color palette.
