import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: AuthCredentialDto) {
    this.logger.log(`Signing in ${signInDto.username}`);

    const user = await this.userModel.findOne({
      username: signInDto.username,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username / password');
    }
    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username / password');
    }

    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUser(payload: any) {
    const { username, sub } = payload;
    return await this.userModel
      .findOne({ _id: sub, username })
      .select('-password')
      .exec();
  }

  async createUser(createUserDto: AuthCredentialDto): Promise<User> {
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
