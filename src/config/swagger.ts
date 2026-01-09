import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Internship Management API',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [{ url: 'http://localhost:5000/api/v1' }],
  },
  apis: [
    path.join(__dirname, '../docs/**/*.yaml'),  
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
