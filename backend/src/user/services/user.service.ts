import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../models/user.model';
import { Address } from '../models/address.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUsers() {
    return await this.userModel.find().exec();
  }

  async getUser(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async postUser(user: User): Promise<any> {
    const postUser = new this.userModel(user);

    return await postUser.save();
  }

  async putUser(id: string, user: User) {
    await this.userModel.updateOne({ _id: id }, user).exec();
    return this.getUser(id);
  }

  async deleteUser(id: string) {
    return await this.userModel.deleteOne({ _id: id }).exec();
  }

  async putAddress(userId: string, address: Address): Promise<any> {
    const user = await this.userModel.findById(userId);

    user.address = address;

    return await user.save();
  }
}
