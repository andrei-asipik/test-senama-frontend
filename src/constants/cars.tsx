export interface DataCars {
  _id: string;
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
