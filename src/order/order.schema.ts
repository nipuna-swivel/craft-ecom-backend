import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderItem } from './orderItem.schema';

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'OrderItem',
  })
  orderItems: [OrderItem];

  @Prop({ required: true })
  orderTotal: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
