import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
import { orderRouters } from './app/modules/order/order.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/product/v1', productRoutes);
app.use('/order/v1', orderRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('bulbul is hear');
});

app.get('*', (req, res) => {
  res.status(500).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
