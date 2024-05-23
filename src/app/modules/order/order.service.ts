import { TOrder } from "./order.interface";
import { orderModel } from "./order.model";


const addOrderIntoDB = async (orderData : TOrder) => {
    const result = await orderModel.create(orderData)
    return result
}

const getAllOrdersIntoDB = async () => {
    const result = await orderModel.find()
    return result
}

const getOrdersByEmailIntoDB = async (email : string) => {
    const result = await orderModel.find({email : email})
    return result
}


export const orderService = {
    addOrderIntoDB,
    getAllOrdersIntoDB,
    getOrdersByEmailIntoDB
}