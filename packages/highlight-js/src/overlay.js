import {
  ANNOTATION_MARKERS,
  DIRECTIVE_KEYS,
  FORMAT_NAMESPACES,
  HIGHLIGHT_JS_SCOPES,
  SEMANTIC_SCOPES,
} from "./contract.js";

const TOKEN_PATTERN = /(@[A-Za-z_][\w]*|"[^"\n]*"|'[^'\n]*'|&quot;[^\n]*?&quot;|\b\d+(?:\.\d+)?\b|[A-Za-z_][\w-]*|\s+|.)/g;
const DOCUMENTATION_LINE_PATTERN = /^(\s*\/\/\/\s*)(@[A-Za-z_][\w]*)(.*)$/;
const COMMENT_SPAN_PATTERN = /(<span class="hljs-comment">)([\s\S]*?)(<\/span>)/g;

function span(scope, value) {
  const hostScope = HIGHLIGHT_JS_SCOPES[scope];
  const classes = hostScope ? `${scope} ${hostScope}` : scope;
  return `<span class="${classes}">${value}</span>`;
}

function isMarker(token) {
  return token.startsWith("@") && ANNOTATION_MARKERS.has(token.slice(1));
}

function isIdentifier(token) {
  return /^[A-Za-z_][\w-]*$/.test(token);
}

function isNumber(token) {
  return /^\d+(?:\.\d+)?$/.test(token);
}

function tokenClass(token, context) {
  if (
    token.startsWith('"') ||
    token.startsWith("'") ||
    (token.startsWith("&quot;") && token.endsWith("&quot;"))
  ) {
    return SEMANTIC_SCOPES.string;
  }

  if (isNumber(token)) {
    return SEMANTIC_SCOPES.number;
  }

  if (FORMAT_NAMESPACES.has(token)) {
    return SEMANTIC_SCOPES.namespace;
  }

  if (DIRECTIVE_KEYS.has(token) || context.directiveKey) {
    return SEMANTIC_SCOPES.key;
  }

  if (context.marker === "field" && !context.fieldNameSeen) {
    return SEMANTIC_SCOPES.field;
  }

  if (context.marker === "constructor" && !context.constructorNameSeen) {
    return SEMANTIC_SCOPES.constructor;
  }

  return SEMANTIC_SCOPES.value;
}

function highlightAnnotationLine(line) {
  const match = line.match(DOCUMENTATION_LINE_PATTERN);
  if (!match || !isMarker(match[2])) return line;

  const prefix = match[1];
  const marker = match[2];
  const markerName = marker.slice(1);
  const remainder = match[3];
  const context = {
    marker: markerName,
    directiveKey: false,
    fieldNameSeen: false,
    constructorNameSeen: false,
  };

  const highlightedRemainder = remainder.replace(TOKEN_PATTERN, (token) => {
    if (!token.trim()) return token;

    let scope;

    if (isIdentifier(token)) {
      if (markerName === "field" && !context.fieldNameSeen) {
        scope = SEMANTIC_SCOPES.field;
        context.fieldNameSeen = true;
      } else if (markerName === "constructor" && !context.constructorNameSeen) {
        scope = SEMANTIC_SCOPES.constructor;
        context.constructorNameSeen = true;
      } else if (DIRECTIVE_KEYS.has(token)) {
        context.directiveKey = true;
      } else {
        context.directiveKey = false;
      }
    }

    scope ??= tokenClass(token, context);
    return span(scope, token);
  });

  return `${prefix}${span(SEMANTIC_SCOPES.marker, marker)}${highlightedRemainder}`;
}

function highlightCommentBody(body) {
  return body
    .split("\n")
    .map(highlightAnnotationLine)
    .join("\n");
}

/**
 * Add codegen scopes to Highlight.js comment HTML without changing the
 * official Gleam grammar output outside documentation comments.
 */
export function overlayCodegenAnnotations(html) {
  return html.replace(COMMENT_SPAN_PATTERN, (_match, open, body, close) => {
    const transformedBody = body.replace(/[^<]+/g, highlightCommentBody);
    return `${open}${transformedBody}${close}`;
  });
}
