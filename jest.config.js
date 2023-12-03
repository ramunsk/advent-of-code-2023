function makeProjectConfig(folder) {
    /** @type {import('jest').Config} */
    const projectConfig = {
        preset: 'ts-jest',
        displayName: folder,
        testMatch: [`<rootDir>/src/${folder}/**/*.spec.ts`],

    }
    return projectConfig;
}


/** @type {import('jest').Config} */
const config = {
    projects: [
        makeProjectConfig('day-01'),
        makeProjectConfig('day-02'),
    ]
};

module.exports = config;
