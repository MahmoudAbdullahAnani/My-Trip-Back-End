import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { PopularDestinations } from '../../interfaces/staticSections.interface';
import { createPopularDestinationsDto } from '../dto/staticSections.dto';
import { updatePopularDestinationsDto } from '../dto/updateStaticSections.dto';

@Injectable()
export class StaticSectionsService {
  constructor(
    @Inject('Popular_Destinations_MODEL')
    private readonly popularDestinationsModule: Model<PopularDestinations>,
  ) {}

  async createPopularDestinations(
    body: createPopularDestinationsDto,
  ): Promise<any> {
    const isSetPopularDestinations = await this.popularDestinationsModule
      .findOne({
        titleAR: body.titleAR,
        titleEN: body.titleEN,
      })
      .select('titleAR titleEN');

    if (isSetPopularDestinations) {
      throw new HttpException(
        {
          message: 'Already set',
          data: isSetPopularDestinations,
        },
        400,
        {
          cause: new Error(),
          description: 'Already set',
        },
      );
    }
    const PopularDestinations =
      await this.popularDestinationsModule.create(body);
    return {
      message: 'Created',
      data: PopularDestinations,
    };
  }
  async updatePopularDestinations(
    body: updatePopularDestinationsDto,
    id: string,
  ): Promise<any> {
    const isPopularDestinations =
      await this.popularDestinationsModule.findById(id);

    if (!isPopularDestinations) {
      throw new NotFoundException();
    }
    const isSetPopularDestinations = await this.popularDestinationsModule
      .findOne(body)
      .select('titleAR titleEN');

    if (isSetPopularDestinations) {
      throw new HttpException(
        {
          message: 'Already set',
          data: isSetPopularDestinations,
        },
        400,
        {
          cause: new Error(),
          description: 'Already set',
        },
      );
    }
    const PopularDestinations =
      await this.popularDestinationsModule.findByIdAndUpdate(id, body, {
        new: true,
      });
    return {
      message: 'Updated',
      data: PopularDestinations,
    };
  }
  async deletePopularDestinations(id: string): Promise<void> {
    const isPopularDestinations =
      await this.popularDestinationsModule.findById(id);

    if (!isPopularDestinations) {
      throw new NotFoundException();
    }

    const PopularDestinations =
      await this.popularDestinationsModule.findByIdAndDelete(id);
  }
  async getAllPopularDestinations(): Promise<any> {
    const isSetPopularDestinations = await this.popularDestinationsModule
      .find()
      .select('titleAR titleEN img');

    return {
      count: isSetPopularDestinations.length,
      data: isSetPopularDestinations,
    };
  }
}
