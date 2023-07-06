import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Craft } from './craft.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCraftDto } from './dto/create-craft.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CraftService {
  private readonly logger = new Logger(CraftService.name);
  constructor(
    @InjectModel(Craft.name) private craftModel: Model<Craft>,
    private uploadService: UploadService,
  ) {}

  async getAllCrafts(searchTerm: string): Promise<Craft[]> {
    this.logger.log(`Get all crafts with search term ${searchTerm}`);

    let options = {};
    if (searchTerm !== 'ALL') {
      const regex = new RegExp(searchTerm, 'i');
      options = { name: regex };
    }

    return await this.craftModel.find(options).exec();
  }

  async getCraftById(id: string): Promise<Craft> {
    this.logger.log(`Get one craft with id ${id}`);
    const craft = await this.craftModel.findById(id).exec();
    if (!craft) {
      throw new NotFoundException('Craft not found');
    }
    return craft;
  }

  async addCraft(
    createCraftDto: CreateCraftDto,
    image: Express.Multer.File,
  ): Promise<Craft> {
    this.logger.log('Create a craft', JSON.stringify(createCraftDto));

    //upload craft image to s3
    const imageUrl = await this.uploadService.uploadFile(image);

    const newCraft = new this.craftModel({
      ...createCraftDto,
      image: imageUrl,
    });
    return newCraft.save();
  }

  async updateCraft(
    id: string,
    updateCraftDto: CreateCraftDto,
    image: Express.Multer.File,
  ): Promise<Craft> {
    this.logger.log(`Update a craft with id ${id}`);

    //get craft by id
    const craft = await this.craftModel.findById(id).exec();

    //check if craft exists
    if (!craft) {
      throw new NotFoundException('Craft not found');
    }

    //update craft
    craft.name = updateCraftDto.name;
    craft.description = updateCraftDto.description;
    craft.price = updateCraftDto.price;
    craft.stock = updateCraftDto.stock;

    if (image) {
      //upload craft image to s3
      craft.image = await this.uploadService.uploadFile(image);
    }

    return craft.save();
  }

  async deleteCraft(id: string): Promise<void> {
    this.logger.log(`Delete a craft with id ${id}`);

    const craft = await this.craftModel.findByIdAndDelete(id);
    if (!craft) {
      throw new NotFoundException('Craft not found');
    }
  }

  updateStock(id: string, quantity: number) {
    this.logger.log(`Update stock of craft with id ${id}`);

    //get craft by id and update stock
    return this.craftModel.findByIdAndUpdate(id, {
      $inc: { stock: -quantity },
    });
  }
}
