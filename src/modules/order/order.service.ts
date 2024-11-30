import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QueryString } from 'src/types/QueryString';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private ordrModel: Model<Order>) {}

  create(createOrderDto: CreateOrderDto) {
    return this.ordrModel.create(createOrderDto);
  }

  async findAll({ fields, limit, queryStr, skip, sort, page }: QueryString) {
    const total = await this.ordrModel.find(queryStr).countDocuments();
    const numberOfPages = Math.ceil(total / limit);
    const orders: CreateOrderDto[] = await this.ordrModel
      .find(queryStr)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(fields)
      .lean()
      .exec();

    return {
      data: orders,
      numberOfPages,
      page,
    };
  }

  async findOne(id: string) {
    return (await this.ordrModel.findById(id).lean().exec()) as CreateOrderDto;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = this.ordrModel.findByIdAndUpdate(
      { id },
      updateOrderDto,
    );
    if (!updatedOrder) {
      return new NotFoundException('order not found');
    }

    return updatedOrder;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
