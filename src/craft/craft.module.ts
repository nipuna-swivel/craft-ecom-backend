import { Module } from '@nestjs/common';
import { CraftController } from './craft.controller';
import { CraftService } from './craft.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Craft, CraftSchema } from './craft.schema';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Craft.name, schema: CraftSchema }]),
    UploadModule,
  ],
  exports: [CraftService],
  controllers: [CraftController],
  providers: [CraftService],
})
export class CraftModule {}
