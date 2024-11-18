import { Button, Form, Input, InputNumber, Modal, Select, Spin } from 'antd';
import { DataCar, DataNewCar } from '../../constants/cars';
import { useEffect, useState } from 'react';
import { createCar, getCar, updateCar } from '../../services/api';

interface FormModalProps {
  open: boolean;
  carId: string | null;
  onClose: () => void;
  onSave: () => void;
}

export default function FormModal({ open, carId, onClose, onSave }: FormModalProps) {
  const [data, setData] = useState<DataCar>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // console.log('useEffect');
    const fetchCar = async () => {
      if (open && carId) {
        setLoading(true);
        try {
          const carData = await getCar(carId);
          setData(carData);
          form.setFieldsValue(carData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCar();
  }, [open, carId, form]);

  const handleSubmit = async (values: DataCar | DataNewCar) => {
    try {
      if (carId) {
        // console.log('updateCar', carId);
        await updateCar(carId, values as DataCar);
      } else {
        // console.log('createCar', carId, values);
        await createCar(values as DataNewCar);
        // await createCar({
        //   make: 'stringqwe',
        //   model: 'stringqwe',
        //   year: 2000,
        //   color: 'string',
        //   engine: 'string',
        //   fuelType: 'Petrol',
        //   transmission: 'Manual',
        //   mileage: 1000,
        //   owner: 'string',
        // });
      }
      onSave();
    } catch (error) {
      console.error(error);
    }
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
                { value: 'Petrol', label: 'Petrol' },
                { value: 'Diesel', label: 'Diesel' },
                { value: 'Electric', label: 'Electric' },
                { value: 'Hybrid', label: 'Hybrid' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Transmission" name="transmission" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'Manual', label: 'Manual' },
                { value: 'Automatic', label: 'Automatic' },
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
