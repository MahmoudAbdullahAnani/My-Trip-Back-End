import { CustomersInterface } from './interfaces/Customers.interface';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/CreateCustomerDto.dto';
import { UpdateCustomerDto } from './dto/UpdateCustomerDto.dto';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CUSTOMERS_MODEL')
    private readonly customerModule: Model<CustomersInterface>,
  ) {}
  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<{ data: CustomersInterface; status: string }> {
    const checkIsExist = await this.customerModule.findOne({
      name: createCustomerDto.name,
      comment: createCustomerDto.comment,
    });

    if (checkIsExist) {
      throw new HttpException('The Customer is already exist', 400);
    }

    return {
      data: await this.customerModule.create(createCustomerDto),
      status: 'created successfully',
    };
  }

  async findAll(): Promise<{
    data: CustomersInterface[];
    status: string;
    count: number;
  }> {
    const customers = await this.customerModule.find();
    return {
      data: customers,
      status: 'success',
      count: customers.length,
    };
  }

  async findOne(
    id: string,
  ): Promise<{ data: CustomersInterface; status: string }> {
    const customer = await this.customerModule.findById(id);
    if (!customer) {
      throw new HttpException('Not Found', 404);
    }

    return {
      data: customer,
      status: 'success',
    };
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<{ data: CustomersInterface; status: string }> {
    const customer = await this.customerModule.findById(id);
    if (!customer) {
      throw new HttpException('Not Found', 404);
    }

    return {
      status: 'Updated successfully',
      data: await this.customerModule.findByIdAndUpdate(id, updateCustomerDto, {
        new: true,
      }),
    };
  }

  async remove(id: string): Promise<void> {
    const customer = await this.customerModule.findById(id);
    if (!customer) {
      throw new HttpException('Not Found', 404);
    }
    await this.customerModule.findByIdAndDelete(id);
  }
}
