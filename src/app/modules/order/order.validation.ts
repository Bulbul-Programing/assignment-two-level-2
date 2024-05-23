import Joi from 'joi'

const orderValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    productId: Joi.string().required(),
    quantity: Joi.number().integer().positive().required(),
    price: Joi.number().positive().required()
});
export default orderValidationSchema