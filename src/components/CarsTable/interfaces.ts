import { DataCar } from '../../services/interfaces';

export interface ColumnConfig {
  title: string;
  dataIndex: string;
  sorter?: (a: DataCar, b: DataCar) => number;
}
