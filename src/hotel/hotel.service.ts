import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HotelService {
  async getHotels(
    chooseCityNameHotel: string,
    dateGoState: string,
    dateReturnState: string,
    adultsDataState: number,
  ) {
    let data = {};
    // In
    const storeDateGoY = `${dateGoState}`.split('/')[2];
    const storeDateGoMonth = `${dateGoState}`.split('/')[1];
    const storeDateGoDay = `${dateGoState}`.split('/')[0];
    // Out
    const storeDateOutY = `${dateReturnState}`.split('/')[2];
    const storeDateOutMonth = `${dateReturnState}`.split('/')[1];
    const storeDateOutDay = `${dateReturnState}`.split('/')[0];
    const api = `https://serpapi.com/search.json?engine=google_hotels&q=${chooseCityNameHotel}&check_in_date=${storeDateGoY}-${storeDateGoMonth}-${storeDateGoDay}&check_out_date=${storeDateOutY}-${storeDateOutMonth}-${storeDateOutDay}&adults=${adultsDataState}&currency=EGP&gl=ar&hl=ar&api_key=3003862109edfb689c88c5d6b7b552f32f0cac58d9ca4b8a9e608f556eb412f9`;
    return await axios
      .get(api)
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch((err) => console.log(err));
  }
}
