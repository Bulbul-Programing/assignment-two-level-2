import { Request, Response } from 'express';
import { productService } from './product.service';
import productValidationSchema from './product.validation';

const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // product data validation with joy

    const { error, value } = productValidationSchema.validate(productData);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.details || 'Something is wrong',
        data: {},
      });
    } else {
      const result = await productService.addProductIntoDB(value);
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
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
};

const getAllProducts = async (req: Request, res: Response) => {
  const query = req.query.searchTerm;
  if (query) {
    try {
      const result = await productService.searchProductIntoDB(
        req.query.searchTerm,
      );
      if (result.length < 1) {
        res.status(500).json({
          success: false,
          message: `Products not found '${req.query.searchTerm}' fetched successfully!`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${req.query.searchTerm}' fetched successfully!`,
          data: result,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'something is wrong',
      });
    }
  } else {
    try {
      const result = await productService.getAllProductsIntoDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'Something is wrong',
        data: {},
      });
    }
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSingleProductsIntoDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      data: {},
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const productId = req.params.productId;
    //product data validation with joy

    const { error, value } = productValidationSchema.validate(productData);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.details || 'Something is wrong',
        data: {},
      });
    } else {
      const result = await productService.updateProductIntoDB(productId, value);
      res.status(200).json({
        success: true,
        message: 'Product update successfully!',
        data: result.updateProductData,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      data: {},
    });
  }
};
const updateProductUsingId = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const productId = req.params.productId;
    //product data validation with joy

    const { error, value } = productValidationSchema.validate(productData);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.details || 'Something is wrong',
        data: {},
      });
    } else {
      const result = await productService.updateProductIntoDB(productId, value);
      res.status(200).json({
        success: true,
        message: 'Product update successfully!',
        data: result.updateProductData,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      data: {},
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await productService.deleteProductIntoDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      data: {},
    });
  }
};

export const productControllers = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  updateProductUsingId,
};
