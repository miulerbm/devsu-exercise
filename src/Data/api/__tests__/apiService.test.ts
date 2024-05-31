import axios from "axios";
import { Alert } from "react-native";
import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  checkProductExists,
} from "../../api/apiService";
import { ProductInterface } from "../../types/types";

import { BASE_URL } from "../../api/apiService";

jest.mock("axios");
jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("apiService tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("debería traer a los productos con éxito", async () => {
      const products: ProductInterface[] = [
        {
          id: "uno",
          name: "Producto 1",
          description: "Descripción del producto 1",
          logo: "assets1",
          date_release: new Date("2024-06-14"),
          date_revision: new Date("2025-06-14"),
        },
        {
          id: "dos",
          name: "Producto 2",
          description: "Descripción del producto 2",
          logo: "assets-2",
          date_release: new Date("2024-07-12"),
          date_revision: new Date("2025-07-12"),
        },
      ];

      mockedAxios.get.mockResolvedValue({ data: { data: products } });

      const result = await getProducts();
      expect(result).toEqual(products);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}`, {
        timeout: 5000,
      });
    });

    it("debería manejar el error al traer un producto", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Network Error"));

      await getProducts();
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error al traer productos",
        "Error desconocido: Error: Network Error"
      );
    });
  });

  describe("getSingleProduct", () => {
    it("debería traer a un producto individual exitosamente", async () => {
      const product: ProductInterface = {
        id: "uno",
        name: "Producto 1",
        description: "Descripción del producto 1",
        logo: "Assets1",
        date_release: new Date("2024-06-14"),
        date_revision: new Date("2025-06-14"),
      };

      mockedAxios.get.mockResolvedValue({ data: product });

      const result = await getSingleProduct("uno");
      expect(result).toEqual(product);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/uno`, {
        timeout: 5000,
      });
    });

    it("debería manejar el error al traer un solo producto", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Network Error"));

      await getSingleProduct("uno");
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error al traer el producto",
        "Error desconocido: Error: Network Error"
      );
    });
  });

  // createProduct
  describe("createProduct", () => {
    it("debería crear un producto exitosamente", async () => {
      const newProduct: ProductInterface = {
        id: "tres",
        name: "Producto 3",
        description: "Descripción del producto 3",
        logo: "Assets3",
        date_release: new Date("2024-08-14"),
        date_revision: new Date("2025-08-14"),
      };

      mockedAxios.post.mockResolvedValue({ data: newProduct });

      const result = await createProduct(newProduct);
      expect(result).toEqual(newProduct);
      expect(Alert.alert).toHaveBeenCalledWith("Se creó un nuevo producto!");
      expect(mockedAxios.post).toHaveBeenCalledWith(`${BASE_URL}`, newProduct, {
        timeout: 5000,
      });
    });

    it("debería manejar el error al crear un producto", async () => {
      mockedAxios.post.mockRejectedValue(new Error("Network Error"));

      await createProduct({
        id: "tres",
        name: "Producto 3",
        description: "Descripción del producto 3",
        logo: "Assets3",
        date_release: new Date("2024-08-14"),
        date_revision: new Date("2025-08-14"),
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error al crear el producto",
        "Error desconocido: Error: Network Error"
      );
    });
  });

  // updateProduct
  describe("updateProduct", () => {
    it("debería actualizar un producto exitosamente", async () => {
      const updatedProduct: ProductInterface = {
        id: "uno",
        name: "Producto 1 actualizado",
        description: "Descripción actualizada del producto 1",
        logo: "Assets1_updated",
        date_release: new Date("2024-06-14"),
        date_revision: new Date("2025-06-14"),
      };

      mockedAxios.put.mockResolvedValue({ data: updatedProduct });

      const result = await updateProduct(updatedProduct);
      expect(result).toEqual(updatedProduct);
      expect(Alert.alert).toHaveBeenCalledWith("Se actualizó el producto!");
      expect(mockedAxios.put).toHaveBeenCalledWith(
        `${BASE_URL}/uno`,
        updatedProduct,
        { timeout: 5000 }
      );
    });

    it("debería manejar el error al actualizar un producto", async () => {
      mockedAxios.put.mockRejectedValue(new Error("Network Error"));

      await updateProduct({
        id: "uno",
        name: "Producto 1 actualizado",
        description: "Descripción actualizada del producto 1",
        logo: "Assets1_updated",
        date_release: new Date("2024-06-14"),
        date_revision: new Date("2025-06-14"),
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error al actualizar el producto",
        "Error desconocido: Error: Network Error"
      );
    });
  });

  // deleteProduct
  describe("deleteProduct", () => {
    it("debería eliminar un producto exitosamente", async () => {
      const product: ProductInterface = {
        id: "uno",
        name: "Producto 1",
        description: "Descripción del producto 1",
        logo: "Assets1",
        date_release: new Date("2024-06-14"),
        date_revision: new Date("2025-06-14"),
      };

      mockedAxios.delete.mockResolvedValue({ data: product });

      const result = await deleteProduct("uno");
      expect(result).toEqual(product);
      expect(Alert.alert).toHaveBeenCalledWith("Se eliminó un producto.");
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${BASE_URL}/uno`, {
        timeout: 5000,
      });
    });

    it("debería manejar el error al eliminar un producto", async () => {
      mockedAxios.delete.mockRejectedValue(new Error("Network Error"));

      await deleteProduct("uno");
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error al eliminar el producto",
        "Error desconocido: Error: Network Error"
      );
    });
  });

  // checkProductExists
  describe("checkProductExists", () => {
    it("debería revisar si un producto existe correctamente", async () => {
      mockedAxios.get.mockResolvedValue({ data: true });

      const result = await checkProductExists("uno");
      expect(result).toBe(true);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${BASE_URL}/verification/uno`,
        { timeout: 5000 }
      );
    });

    it("debería manejar el error cuando se verifique si existe un producto", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Network Error"));

      const result = await checkProductExists("uno");
      expect(result).toBeUndefined();
    });
  });
});
