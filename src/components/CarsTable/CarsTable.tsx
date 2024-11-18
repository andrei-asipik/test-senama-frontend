import { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';

import { DataCar } from '../../services/interfaces';
import FormModal from '../FormModal/FormModal';
import { deleteCar, getAllCars } from '../../services/api';
import { ColumnConfig } from './interfaces';
import styles from './style.module.css';

export default function CarsTable() {
  const [data, setData] = useState<DataCar[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const fetchAllCars = async () => {
    setLoading(true);
    try {
      const cars = await getAllCars();
      setData(cars);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCar(id);
      await fetchAllCars();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id: string) => {
    setSelectedCarId(id);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCarId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCarId(null);
    setIsModalOpen(false);
  };

  const columnConfigs: ColumnConfig[] = [
    { title: 'Make', dataIndex: 'make' },
    { title: 'Model', dataIndex: 'model' },
    {
      title: 'Year',
      dataIndex: 'year',
      sorter: (a, b) => a.year - b.year,
    },
    { title: 'Color', dataIndex: 'color' },
    { title: 'Engine', dataIndex: 'engine' },
    { title: 'Fuel Type', dataIndex: 'fuelType' },
    { title: 'Transmission', dataIndex: 'transmission' },
    {
      title: 'Mileage',
      dataIndex: 'mileage',
      sorter: (a, b) => a.mileage - b.mileage,
    },
    { title: 'Owner', dataIndex: 'owner' },
  ];

  const actionColumn = {
    key: 'actions',
    render: (_: any, record: DataCar) => (
      <Space>
        <Button onClick={() => handleEdit(record._id)}>Edit</Button>
        <Button danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      </Space>
    ),
  };

  const columns = [...columnConfigs, actionColumn];

  return (
    <>
      <Space className={styles['space']}>
        <Button type="primary" onClick={handleAdd}>
          Create
        </Button>
      </Space>
      <Table<DataCar>
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />
      <FormModal
        open={isModalOpen}
        carId={selectedCarId}
        onClose={closeModal}
        onSave={() => {
          closeModal();
          fetchAllCars();
        }}
      />
    </>
  );
}
