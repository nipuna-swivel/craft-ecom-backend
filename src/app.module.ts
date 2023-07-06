import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CraftModule } from './craft/craft.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './upload/upload.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CraftModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UploadModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
