import { craftStub } from './craft.stub';

const orderItemStub = () => ({
  craft: craftStub(),
  quantity: 2,
});

export const orderStub = () => ({
  _id: '5f9d4a3d9d1d9d1d9d1d9d1d',
  firstName: 'John',
  lastName: 'Doe',
  deliveryAddress: '123 Main St',
  postalCode: '12345',
  phoneNumber: '0771234567',
  email: 'johndoe@gmail.com',
  orderItems: [orderItemStub()],
  orderTotal: 2,
});

export const placeOrderStub = () => ({
  _id: '5f9d4a3d9d1d9d1d9d1d9d1d',
  firstName: 'John',
  lastName: 'Doe',
  deliveryAddress: '123 Main St',
  postalCode: '12345',
  phoneNumber: '0771234567',
  email: 'johndoe@gmail.com',
  orderItems: [
    {
      craft: craftStub()._id,
      quantity: 2,
    },
  ],
  orderTotal: 2,
});

export const analyticsStub = () => ({
  totalSales: 100,
  totalOrders: 10,
  totalCraftsSold: 20,
  craftsSoldCount: [
    {
      name: craftStub().name,
      quantity: 4,
    },
  ],
  topFiveCraftsSold: [
    {
      name: craftStub().name,
      quantity: 8,
    },
  ],
});
