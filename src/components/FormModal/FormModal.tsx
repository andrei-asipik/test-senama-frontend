import { Button, Form, Input, InputNumber, Modal, Select, Spin } from 'antd';
import { DataCar, DataNewCar } from '../../services/interfaces';
import { useEffect, useState } from 'react';
import { createCar, getCar, updateCar } from '../../services/api';
import { FormModalProps } from './interfaces';
import styles from './style.module.css';

export default function FormModal({ open, carId, onClose, onSave }: FormModalProps) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchCar = async () => {
    if (open && carId) {
      setLoading(true);
      try {
        const carData = await getCar(carId);
        form.setFieldsValue(carData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (open && !carId) {
      form.setFieldsValue({
        make: '',
        model: '',
        year: 2024,
        color: '',
        engine: '',
        fuelType: '',
        transmission: '',
        mileage: 0,
        owner: '',
      });
    }
  };

  useEffect(() => {
    fetchCar();
  }, [open, carId, form]);

  const handleSubmit = async (values: DataCar | DataNewCar) => {
    try {
      if (carId) {
        await updateCar(carId, values as DataCar);
      } else {
        await createCar(values as DataNewCar);
      }
      onSave();
    } catch (error) {
      console.error(error);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 20 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 20 },
    },
  };

  const formRules = {
    make: [
      { required: true, message: 'Enter the make!' },
      { min: 2, message: 'Make must be at least 2 characters.' },
    ],
    model: [
      { required: true, message: 'Enter the model!' },
      { min: 2, message: 'Model must be at least 2 characters.' },
    ],
    year: [{ required: true, message: 'Enter the year!' }],
    mileage: [{ required: true, message: 'Enter the mileage!' }],
    color: [{ required: true, message: 'Enter the color!' }],
    engine: [{ required: true, message: 'Enter the engine!' }],
    fuelType: [{ required: true, message: 'Select the fuel type!' }],
    transmission: [{ required: true, message: 'Select the transmission type!' }],
    owner: [
      { required: true, message: 'Enter the owner!' },
      { min: 2, message: 'Owner name must be at least 2 characters.' },
    ],
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} className={styles['modal']}>
      <h2 className={styles['title']}> {carId ? 'Edit car' : 'Create new car'}</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form form={form} onFinish={handleSubmit} size="small" {...formItemLayout}>
          <Form.Item label="Make" name="make" rules={formRules.make}>
            <Input />
          </Form.Item>
          <Form.Item label="Model" name="model" rules={formRules.model}>
            <Input />
          </Form.Item>
          <Form.Item label="Year" name="year" rules={formRules.year}>
            <InputNumber className={styles['input-number']} />
          </Form.Item>
          <Form.Item label="Mileage" name="mileage" rules={formRules.mileage}>
            <InputNumber step={1000} className={styles['input-number']} />
          </Form.Item>
          <Form.Item label="Color" name="color" rules={formRules.color}>
            <Input />
          </Form.Item>
          <Form.Item label="Engine" name="engine" rules={formRules.engine}>
            <Input />
          </Form.Item>
          <Form.Item label="Fuel Type" name="fuelType" rules={formRules.fuelType}>
            <Select
              options={[
                { value: 'Petrol', label: 'Petrol' },
                { value: 'Diesel', label: 'Diesel' },
                { value: 'Electric', label: 'Electric' },
                { value: 'Hybrid', label: 'Hybrid' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Transmission" name="transmission" rules={formRules.transmission}>
            <Select
              options={[
                { value: 'Manual', label: 'Manual' },
                { value: 'Automatic', label: 'Automatic' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Owner" name="owner" rules={formRules.owner}>
            <Input />
          </Form.Item>
          <div className={styles['button']}>
            <Button type="primary" htmlType="submit" size="middle">
              Save
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
}
