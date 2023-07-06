import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { LoginResponse } from '../swagger-options';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiExtraModels(AuthCredentialDto)
  @ApiBody({
    schema: {
      $ref: getSchemaPath(AuthCredentialDto),
    },
  })
  @ApiResponse(LoginResponse)
  async signIn(@Body() signInDto: AuthCredentialDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post()
  createAdmin(@Body() signupDto: AuthCredentialDto) {
    return this.authService.createUser(signupDto);
  }
}
