import { Document } from 'mongoose';
export interface CatchDataInterfacer extends Document {
  readonly openWebsite: {
    user_id: string;
    isGuest: boolean;
  };
  readonly search: {
    user_id: string;
    isGuest: boolean;
    systemSearch: string;
    typeSearch: string;

    fromLocation: string;
    toLocation: string;
    fromDate: Date;
    toDate: Date;
    numberAdults: Number;
    numberChild: Number;
    numberInfant: Number;
    typeClass: string;
  };
  readonly chooseTicket: {
    user_id: string;
    isGuest: boolean;
    CompanyLogo: string;
    isStope: Number;
    durationH: string;
    durationM: string;
    price: string;
    timeGo: string;
    timeSet: string;
  };
}
