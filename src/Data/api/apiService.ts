import axios from "axios";
import { ProductInterface } from "../types/types";

const BASE_URL = "http://192.168.1.7:3002/bp/products";

export const getProducts = async () => {
  try {
    const response = await axios.get<{ data: ProductInterface[] }>(BASE_URL);
    return response.data.data;
  } catch (error) {
    throw new Error("Error trayendo los productos " + error);
  }
};

export const getSingleProduct = async (productId: string) => {
  try {
    const response = await axios.get<ProductInterface>(
      `${BASE_URL}/${productId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error trayendo el producto " + error);
  }
};

export const createProduct = async (productData: ProductInterface) => {
  try {
    const { data } = await axios.post<ProductInterface>(BASE_URL, productData);
    return data;
  } catch (error) {
    throw new Error("Error al crear el producto: " + error);
  }
};

export const updateProduct = async (productData: ProductInterface) => {
  try {
    const response = await axios.put<ProductInterface>(
      `${BASE_URL}/${productData.id}`, // Asegúrate de que `productData` tenga un campo `id` que identifica el producto a actualizar
      productData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el producto: " + error);
  }
};
