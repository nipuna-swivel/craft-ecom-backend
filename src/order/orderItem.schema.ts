import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Craft } from '../craft/craft.schema';

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Craft' })
  craft: Craft;

  @Prop({ required: true })
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
