import 'dotenv/config'; 
import express, { Application, Request, Response } from 'express';
import { connectDatabase } from './config/database';
import { config } from './config/environment';
import mainRoute from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';


const app: Application = express();
const port = config.port;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1",mainRoute);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
      status: 'success',
      message: 'TrainLink Rwanda Backend API is running',
      environment: config.env
  });
});


const startServer = async () => {
  try {
   
    await connectDatabase();

  
    app.listen(port, () => {
      console.log(`✅ Server running in ${config.env} mode on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server due to DB connection issues.');
    process.exit(1); 
  }
};

startServer();