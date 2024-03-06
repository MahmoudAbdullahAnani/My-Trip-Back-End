import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
  async updateSearchCatchingData(catchDataDto, id) {
    const catchData = await this.chatchData.findByIdAndUpdate(
      id,
      {
        $addToSet: { search: catchDataDto.search },
      },
      { new: true },
    );
    return { data: catchData, status: 200 };
  }
  async updateTicketCatchingData(catchDataDto, id) {
    const catchData = await this.chatchData.findByIdAndUpdate(
      id,
      {
        $addToSet: { chooseTicket: catchDataDto.chooseTicket },
      },
      { new: true },
    );
    return { data: catchData, status: 200 };
  }

  async findAll(): Promise<{
    data: CatchDataInterfacer[];
    count: number;
    status: number;
  }> {
    const chatchData = await this.chatchData.find().populate({
      path: 'search.user_id',
      select: 'firstName lastName email userName avatar',
    });
    return { data: chatchData, count: chatchData.length, status: 200 };
  }
  async findOne(id): Promise<{ data: CatchDataInterfacer; status: number }> {
    const chatchData = await this.chatchData.findById(id).populate({
      path: 'search.user_id',
      select: 'firstName lastName email userName avatar',
    });
    if (!chatchData) {
      throw new NotFoundException();
    }
    return { data: chatchData, status: 200 };
  }
}
