const TEMPLATE_VARIABLE_REGEX = /\{\{(\w+)\}\}/g;

/**
 * Replaces all `{{variableName}}` placeholders in a string with values from the variables object.
 *
 * @param template - String containing placeholders in the form `{{variableName}}`
 * @param variables - Object mapping variable names to values (string or number)
 * @returns String with placeholders replaced. Unknown variables are replaced with an empty string.
 */
export function parseTemplateVariables(template: string, variables: Record<string, string | number>): string {
    return template.replace(TEMPLATE_VARIABLE_REGEX, (_, name) => {
        const value = variables[name];
        return value.toString();
    });
}
