function makeProjectConfig(folder) {
    /** @type {import('jest').Config} */
    const projectConfig = {
        preset: 'ts-jest',
        displayName: folder,
        testMatch: [`<rootDir>/src/${folder}/**/*.spec.ts`],
        transform: {
            'node_modules/chalk/.+\\.(j|t)sx?$': 'ts-jest',
        },
        // transformIgnorePatterns: [`<rootDir>/node_modules/`],
    };
    return projectConfig;
}

/** @type {import('jest').Config} */
const config = {
    projects: [makeProjectConfig('day-01'), makeProjectConfig('day-02'), makeProjectConfig('day-03')],
};

module.exports = config;
