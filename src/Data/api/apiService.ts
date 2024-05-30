import axios from "axios";
import { ProductInterface } from "../types/types";
import { Alert } from "react-native";

const BASE_URL = "http://192.168.1.7:3002/bp/products";
const TIMEOUT = 5000;

const handleError = (error: unknown, action: string) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      Alert.alert(
        `Error al ${action}`,
        `Error del servidor: ${error.response.status}`
      );
    } else if (error.request) {
      Alert.alert(
        `Error al ${action}`,
        "No se recibió respuesta del servidor."
      );
    } else {
      Alert.alert(
        `Error al ${action}`,
        `Error en la configuración de la solicitud: ${error.message}`
      );
    }
  } else {
    Alert.alert(`Error al ${action}`, `Error desconocido: ${String(error)}`);
  }
  // throw new Error(`Error al ${action}: ${error}`);
};

export const getProducts = async () => {
  try {
    const response = await axios.get<{ data: ProductInterface[] }>(BASE_URL, {
      timeout: TIMEOUT,
    });
    return response.data.data;
  } catch (error) {
    handleError(error, "traer productos");
  }
};

export const getSingleProduct = async (productId: string) => {
  try {
    const response = await axios.get<ProductInterface>(
      `${BASE_URL}/${productId}`,
      { timeout: TIMEOUT }
    );
    return response.data;
  } catch (error) {
    handleError(error, "traer el producto");
  }
};

export const createProduct = async (productData: ProductInterface) => {
  try {
    const { data } = await axios.post<ProductInterface>(BASE_URL, productData, {
      timeout: TIMEOUT,
    });
    Alert.alert("Se creó un nuevo producto!");
    return data;
  } catch (error) {
    handleError(error, "crear el producto");
  }
};

export const updateProduct = async (productData: ProductInterface) => {
  try {
    const response = await axios.put<ProductInterface>(
      `${BASE_URL}/${productData.id}`,
      productData,
      { timeout: TIMEOUT }
    );
    Alert.alert("Se actualizó el producto!");
    return response.data;
  } catch (error) {
    handleError(error, "actualizar el producto");
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await axios.delete<ProductInterface>(
      `${BASE_URL}/${productId}`,
      { timeout: TIMEOUT }
    );
    Alert.alert("Se eliminó un producto.");
    return response.data;
  } catch (error) {
    handleError(error, "eliminar el producto");
  }
};

export const checkProductExists = async (productId: string) => {
  try {
    const response = await axios.get<boolean>(
      `${BASE_URL}/verification/${productId}`,
      { timeout: TIMEOUT }
    );
    return response.data;
  } catch (error) {
    // handleError(error, "verificar la existencia del producto");
    return;
  }
};
