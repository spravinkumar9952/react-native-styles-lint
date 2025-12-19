module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Detect unused styles in React Native StyleSheet.create',
    },
    schema: [],
    fixable: 'code',
  },
  create(context) {
    const sourceCode = context.getSourceCode();
    // Map of StyleSheet.create() node -> Map of property name -> property node
    const stylesheetDefinitions = new Map();
    // Set of used property names (format: "propertyName")
    const usedProperties = new Set();

    // Helper to get property name from different key types
    const getPropertyName = (key) => {
      if (!key) return null;
      if (key.type === 'Identifier') return key.name;
      if (key.type === 'Literal' && typeof key.value === 'string')
        return key.value;
      return null;
    };

    // Check if a variable name contains "style" as a substring (case-insensitive)
    const isStyleVariable = (varName) => {
      if (!varName || typeof varName !== 'string') return false;
      return varName.toLowerCase().includes('style');
    };

    return {

      // Track all StyleSheet.create() calls in the file
      CallExpression(node) {
        // Check if it's StyleSheet.create
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.object &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'StyleSheet' &&
          node.callee.property &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'create'
        ) {
          const styleObject = node.arguments && node.arguments[0];
          if (styleObject && styleObject.type === 'ObjectExpression') {
            const styleKeys = new Map();
            if (styleObject.properties) {
              for (const prop of styleObject.properties) {
                if (prop.type === 'Property') {
                  const keyName = getPropertyName(prop.key);
                  if (keyName) {
                    styleKeys.set(keyName, prop);
                  }
                }
              }
            }
            stylesheetDefinitions.set(node, styleKeys);
          }
        }
      },

      // Track property access: obj.container, obj['container'], etc.
      // Check if object name contains "style"
      MemberExpression(node) {
        if (
          node.object &&
          node.object.type === 'Identifier' &&
          isStyleVariable(node.object.name) &&
          node.property
        ) {
          const propName = getPropertyName(node.property);
          if (propName) {
            usedProperties.add(propName);
          }
        }
      },

      // Track usage in JSX attributes: <View style={styles.container} />
      JSXExpressionContainer(node) {
        if (
          node.expression &&
          node.expression.type === 'MemberExpression' &&
          node.expression.object &&
          node.expression.object.type === 'Identifier' &&
          isStyleVariable(node.expression.object.name) &&
          node.expression.property
        ) {
          const propName = getPropertyName(node.expression.property);
          if (propName) {
            usedProperties.add(propName);
          }
        }
      },

      // After processing the entire file, check for unused styles
      'Program:exit'() {
        // Check all StyleSheet.create() definitions
        for (const [stylesheetNode, styleKeys] of stylesheetDefinitions.entries()) {
          for (const [key, propertyNode] of styleKeys.entries()) {
            if (!usedProperties.has(key)) {
              context.report({
                node: propertyNode,
                message: `Unused style detected: "${key}"`,
                fix(fixer) {
                  const tokenAfter = sourceCode.getTokenAfter(propertyNode);
                  if (tokenAfter && tokenAfter.value === ',') {
                    return fixer.removeRange([
                      propertyNode.range[0],
                      tokenAfter.range[1],
                    ]);
                  }
                  return fixer.remove(propertyNode);
                },
              });
            }
          }
        }
      },
    };
  },
};
