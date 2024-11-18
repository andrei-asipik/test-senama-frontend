export interface DataNewCar {
  make: string;
  model: string;
  year: number;
  color: string;
  engine: string;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  mileage: number;
  owner: string;
}

export interface DataCar extends DataNewCar {
  _id: string;
}
