import { TProduct } from './product.interface';
import { productModel } from './product.model';

const addProductIntoDB = async (product: TProduct) => {
  const result = await productModel.create(product);
  return result;
};

const getAllProductsIntoDB = async () => {
  const result = await productModel.find();
  return result;
};

const getSingleProductsIntoDB = async (id: string) => {
  const result = await productModel.findOne({ _id: id });
  return result;
};

const updateProductIntoDB = async (id: string, updateData: TProduct) => {
  const result = await productModel.findByIdAndUpdate(id, updateData)
  const updateProductData = await productModel.findOne({ _id: id });
  return { result, updateProductData };
};

const deleteProductIntoDB = async (id: string) => {
  const result = await productModel.findOneAndDelete({ _id: id });
  return result;
};

const searchProductIntoDB = async (queryValue: any) => {
  const result = await productModel.find({
    $or: [
      { name: { $regex: queryValue, $options: 'i' } },
      { description: { $regex: queryValue, $options: 'i' }},
      {category : { $regex: queryValue, $options: 'i' }}
    ],
  });
  return result;
};

export const productService = {
  addProductIntoDB,
  getAllProductsIntoDB,
  getSingleProductsIntoDB,
  deleteProductIntoDB,
  updateProductIntoDB,
  searchProductIntoDB,
};