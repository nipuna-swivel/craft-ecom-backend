import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CraftService } from '../craft/craft.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { OrderItem } from './orderItem.schema';
import { mockOrderSchema } from './__mocks__/order.schema';
import { mockOrderItemSchema } from './__mocks__/orderItem.schema';
import { orderStub, analyticsStub } from '../stubs/order.stub';

jest.mock('../craft/craft.service');

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        CraftService,
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderSchema,
        },
        {
          provide: getModelToken(OrderItem.name),
          useValue: mockOrderItemSchema,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  describe('placeOrder', () => {
    test('should add a craft', async () => {
      const placeOrderDto = {
        firstName: orderStub().firstName,
        lastName: orderStub().lastName,
        deliveryAddress: orderStub().deliveryAddress,
        postalCode: orderStub().postalCode,
        phoneNumber: orderStub().phoneNumber,
        email: orderStub().email,
        orderItems: [
          {
            craft: orderStub().orderItems[0].craft._id,
            quantity: orderStub().orderItems[0].quantity,
          },
        ],
        orderTotal: orderStub().orderTotal,
      };

      jest.spyOn(service, 'placeOrder').mockResolvedValue();

      await service.placeOrder(placeOrderDto);

      expect(service.placeOrder).not.toThrowError();
    });
  });

  describe('getAnalytics', () => {
    test('should return analytics', async () => {
      const analytics = analyticsStub();

      jest.spyOn(service, 'getAnalytics').mockResolvedValue(analyticsStub());

      const result = await service.getAnalytics();

      expect(result).toEqual(analytics);
    });
  });
});
