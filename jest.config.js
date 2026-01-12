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
    
    '^uuid$': require.resolve('uuid').replace('dist-node/index.js', 'dist/index.js') || 'uuid'
  },
  
  transformIgnorePatterns: [
    'node_modules/(?!(uuid|sequelize)/)'
  ],
  
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/database/migrations/**',
    '!src/database/seeders/**',
    '!src/serve.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'json-summary'],
    coverageThreshold: {
    global: {
      branches: 5,
      functions: 2,
      lines: 5,
      statements: 5,
    },
  },

};