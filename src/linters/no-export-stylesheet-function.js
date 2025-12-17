// eslint-rules/no-export-stylesheet-function.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Prevent exporting functions or objects that create StyleSheet objects (to keep linting local).',
    },
    schema: [],
  },
  create(context) {
    // Track variables that are StyleSheet.create results
    const stylesheetVariables = new Set();

    // Helper to check if a node is StyleSheet.create
    const isStyleSheetCreate = (node) => {
      if (!node) return false;
      const source = context.getSourceCode().getText(node);
      return source.includes('StyleSheet.create');
    };

    return {
      // Track: const styles = StyleSheet.create({...})
      VariableDeclaration(node) {
        if (node.declarations) {
          for (const decl of node.declarations) {
            if (decl.id && decl.init && isStyleSheetCreate(decl.init)) {
              if (decl.id.type === 'Identifier') {
                stylesheetVariables.add(decl.id.name);
              }
            }
          }
        }
      },

      ExportNamedDeclaration(node) {
        // export function getStyles(...) { ... }
        if (
          node.declaration &&
          node.declaration.type === 'FunctionDeclaration'
        ) {
          const fn = node.declaration;
          if (fn.body) {
            const source = context.getSourceCode().getText(fn.body);
            if (source.includes('StyleSheet.create')) {
              context.report({
                node: fn.id,
                message: `Do not export function "${fn.id.name}" because it contains StyleSheet.create. Keep it file-local.`,
              });
            }
          }
        }

        // export const getStyles = (...) => { ... }
        // export const styles = StyleSheet.create({...})
        if (
          node.declaration &&
          node.declaration.type === 'VariableDeclaration'
        ) {
          for (const decl of node.declaration.declarations) {
            if (decl.init) {
              // Check for arrow functions or function expressions
              if (
                decl.init.type === 'ArrowFunctionExpression' ||
                decl.init.type === 'FunctionExpression'
              ) {
                const source = context.getSourceCode().getText(decl.init.body);
                if (source.includes('StyleSheet.create')) {
                  context.report({
                    node: decl.id,
                    message: `Do not export function "${decl.id.name}" because it contains StyleSheet.create. Keep it file-local.`,
                  });
                }
              }
              // Check for direct StyleSheet.create export: export const styles = StyleSheet.create({...})
              else if (isStyleSheetCreate(decl.init)) {
                context.report({
                  node: decl.id,
                  message: `Do not export "${decl.id.name}" because it contains StyleSheet.create. Keep it file-local.`,
                });
              }
            }
          }
        }

        // export { styles } - check if styles is a StyleSheet variable
        if (node.specifiers) {
          for (const spec of node.specifiers) {
            if (spec.exported && spec.exported.type === 'Identifier') {
              const exportedName = spec.exported.name;
              if (stylesheetVariables.has(exportedName)) {
                context.report({
                  node: spec,
                  message: `Do not export "${exportedName}" because it contains StyleSheet.create. Keep it file-local.`,
                });
              }
            }
          }
        }
      },
    };
  },
};
