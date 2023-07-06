import { Get, Body, Post, UseGuards, Controller } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiExtraModels,
  ApiBody,
  getSchemaPath,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dto/place-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderAnalyticsResponse } from '../swagger-options';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiExtraModels(OrderResponseDto)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(OrderResponseDto),
    },
  })
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Post()
  @ApiExtraModels(PlaceOrderDto)
  @ApiBody({
    schema: {
      $ref: getSchemaPath(PlaceOrderDto),
    },
  })
  async placeOrder(@Body() placeOrderDto: PlaceOrderDto) {
    return await this.orderService.placeOrder(placeOrderDto);
  }

  @Get('/analytics')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiResponse(OrderAnalyticsResponse)
  async getAnalytics() {
    return await this.orderService.getAnalytics();
  }
}
