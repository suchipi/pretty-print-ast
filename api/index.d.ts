/**
 * Formats an AST into a nice readable format.
 *
 * @param ast The AST object(s) to format.
 * @param options Options that affect the format of the returned string.
 * @returns A formatted string containing information about the AST.
 */
export declare function formatAst(ast: {} | Array<{}>, { color, propertyFilter, }?: {
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
}): string;
