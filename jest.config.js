module.exports = {
    roots: ['<rootDir>/src/ts', '<rootDir>/src/test'],
    testMatch: ['**/test/**/?(*.)+(test)\\.(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    collectCoverageFrom: [
        '**/*.ts',
        '!**/node_modules/**'
    ],
    coverageReporters: ['lcov', 'clover', 'text']
};
