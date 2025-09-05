import { Injectable } from '@nestjs/common';
import { supabase } from '../supabaseClient'; // your supabase client setup

@Injectable()
export class UsersService {
  async deleteUserByInstagramUsername(instagramUsername: string) {
    // Delete user record
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('username', instagramUsername);

    // Delete posts
    await supabase
      .from('posts')
      .delete()
      .eq('author_username', instagramUsername);

    // Delete memberships
    await supabase
      .from('memberships')
      .delete()
      .eq('user_username', instagramUsername);

    // Delete media from Supabase storage if needed (optional)

    return !error; // return true if deletion successful
  }
}
