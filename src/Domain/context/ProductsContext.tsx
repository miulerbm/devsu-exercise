import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkProductExists,
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../../Data/api/apiService";
import { ProductInterface } from "../../Data/types/types";
import { Alert } from "react-native";

interface ProductsContextProps {
  products: ProductInterface[] | null;
  singleProduct: ProductInterface | null;
  isLoading: boolean;
  setSingleProduct: React.Dispatch<
    React.SetStateAction<ProductInterface | null>
  >;
  fetchProducts: () => Promise<void>;
  handleGetSingleProduct: (productId: string) => Promise<void>;
  handleCreateProduct: (productData: ProductInterface) => Promise<void>;
  handleUpdateProduct: (productData: ProductInterface) => Promise<void>;
  handleDeleteProduct: (productId: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined
);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe estar dentro de un ProductsProvider");
  }
  return context;
};

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [singleProduct, setSingleProduct] = useState<ProductInterface | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts();
      if (response) {
        setProducts(response);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSingleProduct = async () => {
    if (!singleProduct) return;
    try {
      setIsLoading(true);
      const response = await getSingleProduct(singleProduct.id);
      setSingleProduct(response!);
    } catch (error) {
      console.error("Error fetching single product: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSingleProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      const product = await getSingleProduct(productId);
      setSingleProduct(product!);
    } catch (error) {
      console.error("Error fetching single product:", error);
      setSingleProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (productData: ProductInterface) => {
    try {
      setIsLoading(true);
      const productExists = await checkProductExists(productData.id);
      if (productExists) {
        Alert.alert("Ya existe un producto con ese ID!");
        return;
      } else {
        const createdProduct = await createProduct(productData);

        if (createdProduct) {
          fetchSingleProduct();
          fetchProducts();
        }
      }
    } catch (error) {
      console.error("Error creating product: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (productData: ProductInterface) => {
    try {
      if (JSON.stringify(productData) === JSON.stringify(singleProduct)) {
        Alert.alert(
          "No hay cambios para actualizar. Por favor, modifique el producto."
        );
        return;
      }
      setIsLoading(true);
      const updatedProduct = await updateProduct(productData);
      if (updatedProduct) {
        fetchSingleProduct();
        fetchProducts();
      }
    } catch (error) {
      console.error("Error updating product: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      await deleteProduct(productId);
      setSingleProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        singleProduct,
        isLoading,
        setSingleProduct,
        fetchProducts,
        handleCreateProduct,
        handleUpdateProduct,
        handleGetSingleProduct,
        handleDeleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
