import Joi from 'joi';

// Joi schema for variants
const variantsValidationSchema = Joi.object({
    type: Joi.string().required(),
    value: Joi.string().required()
});

// Joi schema for inventory
const inventoryValidationSchema = Joi.object({
    quantity: Joi.number().required(),
    inStock: Joi.boolean().required()
});

// Joi schema for product
const productValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    variants: Joi.array().items(variantsValidationSchema),
    inventory: inventoryValidationSchema
});

export default productValidationSchema;
