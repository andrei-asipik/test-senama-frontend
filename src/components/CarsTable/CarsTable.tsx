import { useEffect, useState } from 'react';
import { Button, message, Space, Table } from 'antd';

import { DataCars } from '../../constants/cars';
import FormModal from '../FormModal/FormModal';
import axios from 'axios';
import { API_URL } from '../../services/API';

export default function CarsTable() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const getAllCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/getallcars`);
      setData(response.data);
    } catch (error) {
      message.error('Не удалось загрузить данные');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCars();
  }, []);

  const deleteCar = async (id: string) => {
    try {
      console.log(`${API_URL}/delete/${id}`);
      await axios.delete(`${API_URL}/delete/${id}`);
      message.success('Запись успешно удалена');
    } catch (error) {
      message.error('Ошибка при удалении записи');
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    deleteCar(id);
    getAllCars();
  };

  const handleEdit = (id: string) => {
    console.log(id);
    setSelectedCarId(id);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCarId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columnConfigs: Array<{
    title: string;
    dataIndex: string;
    sorter?: (a: DataCars, b: DataCars) => number;
  }> = [
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
    render: (_: any, record: DataCars) => (
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
      <Space style={{ margin: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          Добавить машину
        </Button>
      </Space>
      <Table<DataCars> columns={columns} dataSource={data} rowKey="_id" loading={loading} />
      <FormModal
        open={isModalOpen}
        carId={selectedCarId}
        onClose={closeModal}
        onSave={() => {
          closeModal();
          getAllCars();
        }}
      />
    </>
  );
}
