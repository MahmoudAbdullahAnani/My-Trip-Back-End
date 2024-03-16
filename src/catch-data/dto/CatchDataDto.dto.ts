import { IsObject, IsOptional, IsString } from 'class-validator';

export class CatchDataDto {
  @IsOptional()
  @IsObject({ message: 'open Website must be an object' })
  openWebsite: {
    user_id: string;
    isGuest: boolean;
  };
  @IsOptional()
  @IsObject({ message: 'search must be an object' })
  search: {
    // user_id: string;
    // isGuest: boolean;

    systemSearch: string;
    typeSearch: string;

    fromLocation: string;
    toLocation: string;

    fromDate: string;
    toDate: string;

    numberAdults: Number;
    numberChild: Number;
    numberInfant: Number;
    typeClass: string;
    RateingState: number;
  };
  @IsOptional()
  @IsObject({ message: 'choose Ticket must be an object' })
  chooseTicket: {
    // user_id: string;
    // isGuest: boolean;

    CompanyLogo: string;
    isStope: Number;
    durationH: string;
    durationM: string;
    price: string;
    timeGo: string;
    timeSet: string;

    carID: string;
    startDateCar: string;
    endDateCar: string;
    distanceCar: string;
    categoryCar: string;
    descriptionCar: string;
    serviceProviderCar: string;
    priceCar: string;
  };
}
