module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Detect and remove restricted style properties in React Native StyleSheet.create',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    restrictedStyles: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        description: 'Array of style property names that should be restricted',
                    },
                },
                additionalProperties: false,
            },
        ],
        fixable: 'code',
    },
    create(context) {
        const options = context.options[0] || {};
        const restrictedStyles = options.restrictedStyles || [];

        if (restrictedStyles.length === 0) {
            return {};
        }

        return {
            CallExpression(node) {
                // Match StyleSheet.create(...)
                if (
                    node.callee.type === 'MemberExpression' &&
                    node.callee.object.name === 'StyleSheet' &&
                    node.callee.property.name === 'create'
                ) {
                    const styleObject = node.arguments[0];
                    if (!styleObject || styleObject.type !== 'ObjectExpression') return;

                    const sourceCode = context.getSourceCode();

                    // Helper function to recursively check style objects
                    const checkStyleObject = (objNode) => {
                        if (!objNode || objNode.type !== 'ObjectExpression') return;

                        for (const property of objNode.properties) {
                            if (property.type !== 'Property' || !property.key) continue;

                            let propertyName = null;

                            // Handle different key types (Identifier, Literal, etc.)
                            if (property.key.type === 'Identifier') {
                                propertyName = property.key.name;
                            } else if (property.key.type === 'Literal' && typeof property.key.value === 'string') {
                                propertyName = property.key.value;
                            }

                            if (!propertyName) continue;

                            // Check if this style property is restricted (case-insensitive)
                            // Also handle camelCase conversion (e.g., 'font-weight' matches 'fontWeight')
                            const normalizedName = propertyName.toLowerCase().replace(/-/g, '');
                            let isRestricted = false;
                            let restrictedName = null;

                            for (const restricted of restrictedStyles) {
                                const normalizedRestricted = restricted.toLowerCase().replace(/-/g, '');
                                if (normalizedName === normalizedRestricted) {
                                    isRestricted = true;
                                    restrictedName = restricted;
                                    break;
                                }
                            }

                            if (isRestricted) {
                                context.report({
                                    node: property,
                                    message: `Restricted style property "${propertyName}" is not allowed.`,
                                    fix(fixer) {
                                        const tokenAfter = sourceCode.getTokenAfter(property);
                                        if (tokenAfter && tokenAfter.value === ',') {
                                            return fixer.removeRange([property.range[0], tokenAfter.range[1]]);
                                        }
                                        return fixer.remove(property);
                                    },
                                });
                            }

                            // Recursively check nested style objects
                            if (property.value && property.value.type === 'ObjectExpression') {
                                checkStyleObject(property.value);
                            }
                        }
                    };

                    // Check all style objects in StyleSheet.create()
                    checkStyleObject(styleObject);
                }
            },
        };
    },
};

