import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Craft {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  stock: number;
}

export const CraftSchema = SchemaFactory.createForClass(Craft);
