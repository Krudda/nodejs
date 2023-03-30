module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'import/extensions': 0,
        'class-methods-use-this': 0,
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        indent: ['error', 4],
        'no-multi-spaces': ['error'],
        enforceForClassFields: 0,
    },
};
