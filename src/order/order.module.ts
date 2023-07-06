import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, Order } from './order.schema';
import { OrderItemSchema, OrderItem } from './orderItem.schema';
import { CraftModule } from '../craft/craft.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
    CraftModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
