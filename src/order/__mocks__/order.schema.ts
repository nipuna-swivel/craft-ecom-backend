import { mockOrderItemSchema } from './orderItem.schema';

export const mockOrderSchema = {
  orderItems: [mockOrderItemSchema],
  firstName: String,
  lastName: String,
  deliveryAddress: String,
  postalCode: String,
  phoneNumber: String,
  email: String,
  orderTotal: Number,
};
