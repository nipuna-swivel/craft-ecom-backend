import { orderStub, analyticsStub } from '../../stubs/order.stub';

export const OrderService = jest.fn().mockReturnValue({
  getAllOrders: jest.fn().mockResolvedValue([orderStub()]),
  placeOrder: jest.fn().mockResolvedValue(orderStub()),
  getAnalytics: jest.fn().mockResolvedValue(analyticsStub()),
});
