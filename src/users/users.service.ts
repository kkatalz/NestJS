import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Dave1',
      email: 'dave@davegray.codes',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Sam',
      email: 'sam@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Lui',
      email: 'lui@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Margo',
      email: 'margo@gmail.codes',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Michael',
      email: 'michael@gmail.codes',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User with given role is not found');
      return rolesArray;
    }
    return this.users;
  }

  findAllInterns() {
    return this.users.filter((user) => user.role === 'INTERN');
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User with given id is not found');
    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
