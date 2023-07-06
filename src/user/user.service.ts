import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );

      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }
}
