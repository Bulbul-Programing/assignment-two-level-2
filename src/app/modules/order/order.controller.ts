import { Request, Response } from 'express';
import { orderService } from './order.service';
import orderValidationSchema from './order.validation';
import { productService } from '../product/product.service';

const addOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // order data validation with joi
    const { error, value } = orderValidationSchema.validate(orderData);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.details || 'Something is wrong',
        data: {},
      });
    } else {
      const orderProductDetails = await productService.getSingleProductsIntoDB(
        value.productId,
      );

      if (orderProductDetails) {
        if ((orderProductDetails.inventory.quantity as number) < 1) {
          res.status(500).json({
            success: false,
            message: 'Insufficient quantity available in inventory',
          });
        } else {
          orderProductDetails.inventory.quantity =
            orderProductDetails.inventory.quantity - 1;
          if ((orderProductDetails.inventory.quantity as number) < 1) {
            orderProductDetails.inventory.inStock = false;
            await productService.updateProductIntoDB(
              orderProductDetails._id.toHexString(),
              orderProductDetails,
            );
          }
          await productService.updateProductIntoDB(
            orderProductDetails._id.toHexString(),
            orderProductDetails,
          );

          const result = await orderService.addOrderIntoDB(value);
          res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: 'product not found',
        });
      }
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      data: {},
    });
  }
};

const allOrders = async (req: Request, res: Response) => {
  const query = req.query.email as string;

  if (query) {
    const result = await orderService.getOrdersByEmailIntoDB(query);
    if (result.length < 1) {
      res.status(500).json({
        success: false,
        message: 'Order not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    }
  } else {
    try {
      const result = await orderService.getAllOrdersIntoDB();
      if (result.length < 1) {
        res.status(500).json({
          success: false,
          message: 'Order not found',
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully!',
          data: result,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'Something is wrong',
        data: {},
      });
    }
  }
};

export const orderControllers = {
  addOrder,
  allOrders,
};
