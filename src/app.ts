import express, { Application } from 'express';
import itemRoutes from './routes/itemRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

const app: Application = express();
const PORT = 5002;

app.use(cors())
app.use(express.json());
app.use('/items', itemRoutes);

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mock API',
      version: '1.0.0',
      description: 'Mock API manager.'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api`);
});
