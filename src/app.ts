import express, { Application } from 'express';
import itemRoutes from './routes/itemRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

const app: Application = express();
const PORT = 5002;

app.use(express.json());
app.use('/items', itemRoutes);
app.use(cors())

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Items API',
      version: '1.0.0',
      description: 'API de gerenciamento de itens'
    },
    servers: [
      {
        url: 'http://localhost:5002',
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
