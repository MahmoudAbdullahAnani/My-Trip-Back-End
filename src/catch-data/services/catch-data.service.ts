import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CatchDataInterfacer } from '../interfaces/chatch-data.interfece';

@Injectable()
export class CatchDataService {
  constructor(
    @Inject('CATCH_DATA_MODEL')
    private readonly chatchData: Model<CatchDataInterfacer>,
  ) {}

  async catchingData(catchDataDto) {
    const catchData = new this.chatchData(catchDataDto);
    await catchData.save();
    return catchData;
  }

  async findAll(): Promise<{ data: CatchDataInterfacer[]; status: number }> {
    const chatchData = await this.chatchData.find().populate({
      path: 'search.user_id',
      select: 'firstName lastName email userName avatar',
    });
    return { data: chatchData, status: 200 };
  }
}
