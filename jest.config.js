/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  moduleNameMapper: {
    // This forces Jest to use the CommonJS entry point for uuid
    '^uuid$': require.resolve('uuid').replace('dist-node/index.js', 'dist/index.js') || 'uuid'
  },
  // We need to tell Jest to actually transform sequelize if it's using ESM internally
  transformIgnorePatterns: [
    'node_modules/(?!(uuid|sequelize)/)'
  ],
};