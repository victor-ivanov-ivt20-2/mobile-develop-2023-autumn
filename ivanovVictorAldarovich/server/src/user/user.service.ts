import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUpdateInput } from './dto/users-update';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  
  async findAll() {
    const users = this.prisma.user.findMany();
    return users;
  }

  async update(id: string, userUpdateInput: UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: userUpdateInput.email,
        username: userUpdateInput.username,
      },
    });
  }

}
