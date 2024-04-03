import { Inject, Injectable } from '@nestjs/common';
import { SubInterface } from '../interfaces/mainMsg.interface';
import { Model } from 'mongoose';

@Injectable()
export class SubService {
  constructor(
    @Inject('SUB_MODEL') private readonly subModule: Model<SubInterface>,
  ) {}
}
