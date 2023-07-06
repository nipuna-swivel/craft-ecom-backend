import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Delete,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CraftService } from './craft.service';
import { CreateCraftDto } from './dto/create-craft.dto';
import { CraftResponseDto } from './dto/craft-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { CraftBody } from '../swagger-options';

@ApiTags('crafts')
@Controller('crafts')
export class CraftController {
  constructor(private readonly craftService: CraftService) {}

  @Get()
  @ApiExtraModels(CraftResponseDto)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(CraftResponseDto),
    },
    isArray: true,
  })
  async getAllCrafts(@Query('search') searchTerm: string) {
    return await this.craftService.getAllCrafts(searchTerm);
  }

  @Get(':id')
  @ApiExtraModels(CraftResponseDto)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(CraftResponseDto),
    },
  })
  async getCraftById(@Param('id') id: string) {
    return await this.craftService.getCraftById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody(CraftBody)
  @ApiExtraModels(CraftResponseDto)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(CraftResponseDto),
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @UseInterceptors(FileInterceptor('image'))
  async addCraft(
    @Body() createCraftDto: CreateCraftDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.craftService.addCraft(createCraftDto, image);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody(CraftBody)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @UseInterceptors(FileInterceptor('image'))
  async updateCraft(
    @Param('id') id: string,
    @Body() updateCraftDto: CreateCraftDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.craftService.updateCraft(id, updateCraftDto, image);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async deleteCraft(@Param('id') id: string) {
    return await this.craftService.deleteCraft(id);
  }
}
