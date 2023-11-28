import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import Amadeus from 'amadeus';



@Controller('airport-search')
export class AirportSearchController {
  @Get()
  async create(@Query() getAirportSearchDto: { term: string }): Promise<[{}]> {
    const amadeus = new Amadeus({
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
    });
    console.log(getAirportSearchDto);
    let data: [{}] = [{}];
    const res = await amadeus.referenceData.locations.get({
      keyword: getAirportSearchDto.term,
      subType: 'AIRPORT,CITY',
    });
    console.log(res);
    
    return res;
  }
}
