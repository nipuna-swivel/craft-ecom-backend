import { Injectable, Logger, HttpException } from '@nestjs/common';
import { PlaceOrderDto } from './dto/place-order.dto';
import { CraftService } from '../craft/craft.service';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { OrderItem } from './orderItem.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItem>,
    private readonly craftService: CraftService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    this.logger.log('Get all orders');

    return await this.orderModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'orderItems',
        populate: {
          path: 'craft',
        },
      })
      .exec();
  }

  async placeOrder(placeOrderDto: PlaceOrderDto) {
    this.logger.log('Place an order', JSON.stringify(placeOrderDto));

    //check remaining stock before place an order
    for (const item of placeOrderDto.orderItems) {
      const craft = await this.craftService.getCraftById(item.craft);
      if (craft.stock < item.quantity) {
        throw new HttpException(`${craft.name} is out of stock`, 400);
      }
    }

    //create order items
    const orderItems = [];
    for (const item of placeOrderDto.orderItems) {
      const orderItem = new this.orderItemModel(item);
      const savedOrderItem = await orderItem.save();
      orderItems.push(savedOrderItem._id);
    }

    //save order
    const newOrder = new this.orderModel({
      ...placeOrderDto,
      orderItems,
    });

    await newOrder.save();

    //update stock after place an order
    for (const item of placeOrderDto.orderItems) {
      this.craftService.updateStock(item.craft, item.quantity);
    }
  }

  async getAnalytics() {
    this.logger.log('Get analytics');

    const orders = await this.getAllOrders();

    const totalSales = orders.reduce((a, b) => a + b.orderTotal, 0);
    const totalOrders = orders.length;
    const totalCraftsSold = orders.reduce(
      (a, b) => a + b.orderItems.reduce((a, b) => a + b.quantity, 0),
      0,
    );

    const craftsSoldCount = Object.entries(
      orders.reduce((acc, order) => {
        order.orderItems.forEach((item) => {
          const { name } = item.craft;
          const { quantity } = item;
          acc[name] = acc[name] ? acc[name] + quantity : quantity;
        });
        return acc;
      }, {}),
    ).map(([name, quantity]) => ({ name, quantity }));

    craftsSoldCount.sort(
      (
        a: { name: string; quantity: number },
        b: { name: string; quantity: number },
      ) => b.quantity - a.quantity,
    );

    const topFiveCraftsSold = craftsSoldCount.slice(0, 5);

    return {
      totalSales,
      totalOrders,
      totalCraftsSold,
      craftsSoldCount,
      topFiveCraftsSold,
    };
  }
}
