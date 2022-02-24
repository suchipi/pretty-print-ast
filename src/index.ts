import traverse from "@suchipi/traverse";

let isNode = false;
try {
  // @ts-ignore process not defined
  isNode = process.argv0 != null;
} catch (err) {
  // ignored
}

const identityStringFn = (value: string) => value;

const fakeKleur = {
  red: identityStringFn,
  dim: identityStringFn,
  magenta: identityStringFn,
  blue: identityStringFn,
  yellow: identityStringFn,
  cyan: identityStringFn,
  green: identityStringFn,

  bold: identityStringFn,
  italic: identityStringFn,
  underline: identityStringFn,
};
let autoDetectedKleur = fakeKleur;
if (isNode) {
  // I use eval("require") here instead of just require,
  // so that webpack et. al don't try to bundle kleur into
  // browser stuff, since it won't be used even if it's
  // bundled.
  autoDetectedKleur = eval("require")("kleur");
}

const primitiveTypes = new Set(["number", "string", "boolean", "undefined"]);
const defaultKeysToIgnore = new Set([
  "tokens",
  "comments",
  "loc",
  "type",
  "start",
  "end",
]);

function isASTNode(value: unknown) {
  return (
    typeof value === "object" &&
    value != null &&
    // @ts-ignore accessing unknown property type
    typeof value.type === "string"
  );
}

/**
 * Formats an AST into a nice readable format.
 *
 * @param ast The AST object(s) to format.
 * @param options Options that affect the format of the returned string.
 * @returns A formatted string containing information about the AST.
 */
export function formatAst(
  ast: {} | Array<{}>,
  {
    color = true,
    propertyFilter = (key) => !defaultKeysToIgnore.has(key),
  }: {
    /**
     * Whether to use ANSI color escape sequences in the output string.
     *
     * This does nothing in the browser.
     */
    color?: boolean;

    /**
     * A function which filters which properties are printed with
     * each AST node. Return `true` to include the property, or
     * `false` to exclude it.
     */
    propertyFilter?: (key: string) => boolean;
  } = {}
): string {
  if (typeof ast !== "object" || ast == null) {
    throw new Error(
      "Received an unexpected argument type in formatAst: " + ast === null
        ? "null"
        : typeof ast
    );
  }

  const kleur = color ? autoDetectedKleur : fakeKleur;
  const outputLines: Array<string> = [];

  const ids = new WeakMap<{ type: string }, number>();

  const counts = {};
  function assignId(node: { type: string }) {
    if (counts[node.type] == null) {
      counts[node.type] = 1;
    }

    const id = counts[node.type]++;

    ids.set(node, id);

    return id;
  }

  const inputs: Array<{ node: any; path: Array<string | number> }> = [];

  traverse(ast, {
    before: (value, path) => {
      const lastPart = path[path.length - 1];
      if (lastPart != null && !propertyFilter(String(lastPart))) {
        return traverse.stop;
      }

      if (isASTNode(value)) {
        assignId(value);

        inputs.push({ node: value, path });
      }

      return;
    },
  });

  function prettifyValue(value: any) {
    if (typeof value === "string") {
      return kleur.yellow(JSON.stringify(value));
    } else if (typeof value === "number") {
      return kleur.magenta(String(value));
    } else if (Array.isArray(value)) {
      return (
        kleur.dim("[") +
        value.map((child) => prettifyValue(child)).join(", ") +
        kleur.dim("]")
      );
    } else if (value == null || typeof value === "boolean") {
      return kleur.red(String(value));
    } else if (isASTNode(value)) {
      return (
        kleur.bold(kleur.cyan(value.type)) + kleur.green("#" + ids.get(value))
      );
    }
  }

  while (inputs.length > 0) {
    const { node, path } = inputs.shift()!;

    const pathString = path
      .map((part) => (typeof part === "number" ? `[${part}]` : "." + part))
      .join("");

    const nodeProperties = Object.keys(node).filter((key) => {
      if (!propertyFilter(key)) return false;

      const value = node[key];

      return (
        value === null ||
        primitiveTypes.has(typeof value) ||
        (Array.isArray(value) &&
          value.every((child) => primitiveTypes.has(typeof child)))
      );
    });

    const propertiesWithChildren = Object.keys(node).filter((key) => {
      if (!propertyFilter(key)) return false;

      const value = node[key];

      return (
        isASTNode(value) ||
        (Array.isArray(value) && value.length > 0 && value.every(isASTNode))
      );
    });

    outputLines.push(
      [
        prettifyValue(node) + kleur.italic(kleur.dim(" at root" + pathString)),

        ...nodeProperties.map((key) => {
          const value = node[key];
          const prettyValue = prettifyValue(value);

          return (
            "  " +
            `${kleur.magenta(key)}${kleur.dim(":")} ${prettyValue}`.trim()
          );
        }),

        ...propertiesWithChildren.map((key) => {
          const value = node[key];
          const prettyValue = prettifyValue(value);

          return (
            "  " +
            `${kleur.magenta(key)}${
              Array.isArray(value)
                ? " (" +
                  value.length +
                  ` ${value.length === 1 ? "child" : "children"})`
                : ""
            }${kleur.dim(":")} ${prettyValue}`.trim()
          );
        }),

        ...(inputs.length === 0 ? [] : [""]),
      ].join("\n")
    );
  }

  return outputLines.join("\n");
}
