import { OffersHotelsInterface } from './interfaces/users.interface';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateOffersHotelDto } from './dto/create-offers-hotel.dto';
import { UpdateOffersHotelDto } from './dto/update-offers-hotel.dto';
import { Model } from 'mongoose';

@Injectable()
export class OffersHotelsService {
  constructor(
    @Inject('OFFERS_HOTELS_MODEL')
    private readonly offersHotelsModule: Model<OffersHotelsInterface>,
  ) {}
  async create(
    createOffersHotelDto: CreateOffersHotelDto,
  ): Promise<{ data: OffersHotelsInterface; status: string }> {
    const checkIsExist = await this.offersHotelsModule.findOne({
      name: createOffersHotelDto.name,
      rating: createOffersHotelDto.rating,
    });

    if (checkIsExist) {
      throw new HttpException('The hotel is already exist', 400);
    }

    return {
      data: await this.offersHotelsModule.create(createOffersHotelDto),
      status: 'created successfully',
    };
  }

  async findAll(): Promise<{
    data: OffersHotelsInterface[];
    status: string;
    count: number;
  }> {
    const offersHotels = await this.offersHotelsModule.find();
    return {
      data: offersHotels,
      status: 'success',
      count: offersHotels.length,
    };
  }

  async findOne(
    id: string,
  ): Promise<{ data: OffersHotelsInterface; status: string }> {
    const offersHotel = await this.offersHotelsModule.findById(id);
    if (!offersHotel) {
      throw new HttpException('Not Found', 404);
    }

    return {
      data: offersHotel,
      status: 'success',
    };
  }

  async update(
    id: string,
    updateOffersHotelDto: UpdateOffersHotelDto,
  ): Promise<{ data: OffersHotelsInterface; status: string }> {
    const offersHotel = await this.offersHotelsModule.findById(id);
    if (!offersHotel) {
      throw new HttpException('Not Found', 404);
    }

    return {
      status: 'Updated successfully',
      data: await this.offersHotelsModule.findByIdAndUpdate(
        id,
        updateOffersHotelDto,
        { new: true },
      ),
    };
  }

  async remove(id: string): Promise<void> {
    const offersHotel = await this.offersHotelsModule.findById(id);
    if (!offersHotel) {
      throw new HttpException('Not Found', 404);
    }
    await this.offersHotelsModule.findByIdAndDelete(id);
  }
}
