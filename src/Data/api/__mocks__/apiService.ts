import { ProductInterface } from "../../types/types";

export const getProducts = jest.fn(() =>
  Promise.resolve([
    {
      id: "uno",
      name: "Producto a",
      description: "Descripción del producto 1",
      logo: "Assets1",
      date_release: "2026-06-14",
      date_revision: "2027-06-14",
    },
    {
      id: "dos",
      name: "Producto 2",
      description: "Nueva descripción del producto 2",
      logo: "Assets2",
      date_release: "2024-05-31",
      date_revision: "2025-05-31",
    },
    {
      id: "tres",
      name: "Producto 3",
      description: "Descripción del producto 3",
      logo: "assets3",
      date_release: "2024-08-17",
      date_revision: "2025-08-17",
    },
  ])
);

export const getSingleProduct = jest.fn<
  Promise<ProductInterface | undefined>,
  [string]
>();

export const createProduct = jest.fn();
export const updateProduct = jest.fn();
export const deleteProduct = jest.fn();
export const checkProductExists = jest.fn();
