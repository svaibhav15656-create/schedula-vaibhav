import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: any[] = [];

  create(user: any) {
    this.users.push(user);
    return user;
  }

  findByEmail(email: string) {
    return this.users.find(
      (user) => user.email === email,
    );
  }
}