import axios from 'axios';
import { message } from 'antd';
import { DataCar, DataNewCar } from './interfaces';

const API_BASE_URL = 'http://localhost:8000/api/cars';

export const getAllCars = async (): Promise<DataCar[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getallcars`);
    return response.data;
  } catch (error) {
    message.error('Failed to upload data');
    console.error(error);
    throw error;
  }
};

export const deleteCar = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`);
    message.success('Запись успешно удалена');
  } catch (error) {
    message.error('Error deleting a record');
    console.error(error);
    throw error;
  }
};

export const getCar = async (id: string): Promise<DataCar> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getcar/${id}`);
    return response.data;
  } catch (error) {
    message.error('Failed to upload data');
    console.error(error);
    throw error;
  }
};

export const updateCar = async (id: string, values: DataCar): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/update/${id}`, values);
    message.success('The record has been successfully updated');
  } catch (error) {
    message.error('Error saving data');
    console.error(error);
    throw error;
  }
};

export const createCar = async (values: DataNewCar): Promise<void> => {
  console.log(values);
  try {
    await axios.post(`${API_BASE_URL}/create`, values);
    message.success('The record has been successfully created');
  } catch (error) {
    message.error('Error saving data');
    console.error(error);
    throw error;
  }
};
