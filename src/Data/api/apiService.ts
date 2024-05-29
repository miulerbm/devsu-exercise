import axios from "axios";
import { ProductInterface } from "../types/types";

const BASE_URL = "http://192.168.1.7:3002/bp/products";

export const getProducts = async () => {
  try {
    const response = await axios.get<{ data: ProductInterface[] }>(BASE_URL);
    return response.data.data; // Devolver solo el array de productos
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
};

export const createProduct = async (productData: ProductInterface) => {
  try {
    const { data } = await axios.post<ProductInterface>(BASE_URL, productData);
    return data;
  } catch (error) {
    throw new Error("Error creating product: " + error);
  }
};

export const getSingleProduct = async (productId: string) => {
  try {
    const response = await axios.get<ProductInterface>(
      `${BASE_URL}/${productId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
};
