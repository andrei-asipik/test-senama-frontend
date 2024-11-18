import { Button, Form, Input, InputNumber, message, Modal, Select, Spin } from 'antd';
import { DataCars } from '../../constants/cars';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/API';

interface FormModalProps {
  open: boolean;
  carId: string | null;
  onClose: () => void;
  onSave: () => void;
}

export default function FormModal({ open, carId, onClose, onSave }: FormModalProps) {
  const [data, setData] = useState<DataCars>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const getCar = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/getcar/${id}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      message.error('Не удалось загрузить данные');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && carId) {
      getCar(carId);
    }
  }, [open, carId]);

  const updateCar = async (values: DataCars) => {
    try {
      await axios.put(`${API_URL}/update/${carId}`, values);
      message.success('Машина успешно обновлена');
      onSave();
    } catch (error) {
      message.error('Ошибка при сохранении данных');
      console.error(error);
    }
  };

  const createCar = async (values: DataCars) => {
    try {
      await axios.post(`${API_URL}/create`, values);
      message.success('Машина успешно создана');
      onSave();
    } catch (error) {
      message.error('Ошибка при сохранении данных');
      console.error(error);
    }
  };

  const handleSubmit = (values: DataCars) => {
    carId ? updateCar(values) : createCar(values);
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form form={form} initialValues={data} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Make" name="make" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Model" name="model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Year" name="year" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Mileage" name="mileage" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Color" name="color" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Fuel Type" name="fuelType" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'petrol', label: 'Petrol' },
                { value: 'diesel', label: 'Diesel' },
                { value: 'electric', label: 'Electric' },
                { value: 'hybrid', label: 'Hybrid' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Transmission" name="transmission" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'manual', label: 'Manual' },
                { value: 'automatic', label: 'Automatic' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Owner" name="owner" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
