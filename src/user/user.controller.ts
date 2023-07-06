import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

//for create admin

@Controller('user')
export class UserController {
  constructor(private readonly adminService: UserService) {}

  @Post()
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }
}
