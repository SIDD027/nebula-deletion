import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('delete')
  async deleteUser(@Body('instagram_username') instagramUsername: string) {
    if (!instagramUsername) return { success: false, error: 'Username required' };

    const deleted = await this.usersService.deleteUserByInstagramUsername(instagramUsername);
    if (deleted) return { success: true };
    return { success: false, error: 'User not found or already deleted' };
  }
}
