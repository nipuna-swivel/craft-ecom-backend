import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderStub, placeOrderStub, analyticsStub } from '../stubs/order.stub';

jest.mock('./order.service');

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  describe('getAllOrders', () => {
    describe('when getAllOrders is called', () => {
      let orders;

      beforeEach(async () => {
        orders = await controller.getAllOrders();
      });

      test('then it should call orderService', () => {
        expect(service.getAllOrders).toBeCalled();
      });

      test('then it should return orders', () => {
        expect(orders).toEqual([orderStub()]);
      });
    });
  });

  describe('placeOrder', () => {
    describe('when placeOrder is called', () => {
      let order;

      const placeOrderDto = {
        firstName: placeOrderStub().firstName,
        lastName: placeOrderStub().lastName,
        deliveryAddress: placeOrderStub().deliveryAddress,
        postalCode: placeOrderStub().postalCode,
        phoneNumber: placeOrderStub().phoneNumber,
        email: placeOrderStub().email,
        orderItems: placeOrderStub().orderItems,
        orderTotal: placeOrderStub().orderTotal,
      };

      beforeEach(async () => {
        order = await controller.placeOrder(placeOrderDto);
      });

      test('then it should call craftService', () => {
        expect(service.placeOrder).toBeCalledWith(placeOrderDto);
      });

      test('then it should return a craft', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });

  describe('getAnalytics', () => {
    describe('when getAnalytics is called', () => {
      let analytics;

      beforeEach(async () => {
        analytics = await controller.getAnalytics();
      });

      test('then it should call orderService', () => {
        expect(service.getAnalytics).toBeCalled();
      });

      test('then it should return order analytics', () => {
        expect(analytics).toEqual(analyticsStub());
      });
    });
  });
});
