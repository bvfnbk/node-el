module.exports = {
    root: true,
    env: {
        node: true
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        quotes: ['error', 'single', {'allowTemplateLiterals': true}]
    },
    overrides: [
        {
            files: ['**/*.json'],
            rules: {
                quotes: ['error', 'double']
            }
        }
    ]
};
