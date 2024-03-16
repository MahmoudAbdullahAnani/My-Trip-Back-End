export interface HotelData {
  excluded_amenities: string[];
  type: string;
  name: string;
  description: string;
  link: string;
  gps_coordinates: {
    latitude: number;
    longitude: number;
  };
  check_in_time: string;
  check_out_time: string;
  rate_per_night: {
    lowest: string;
    extracted_lowest: number;
    before_taxes_fees: string;
    extracted_before_taxes_fees: number;
  };
  total_rate: {
    lowest: string;
    extracted_lowest: number;
    before_taxes_fees: string;
    extracted_before_taxes_fees: number;
  };
  deal: string;
  deal_description: string;
  nearby_places: {
    name: string;
    transportations: {
      type: string;
      duration: string;
    }[];
  }[];
  hotel_class: string;
  extracted_hotel_class: number;
  images: {
    thumbnail: string;
    original_image: string;
  }[];
  overall_rating: number;
  reviews: number;
  ratings: {
    stars: number;
    count: number;
  }[];
  location_rating: number;
  reviews_breakdown: {
    name: string;
    description: string;
    total_mentioned: number;
    positive: number;
    negative: number;
    neutral: number;
  }[];
  amenities?: string[];
  essential_info?: string[];
  property_token: string;
  serpapi_property_details_link: string;
}
