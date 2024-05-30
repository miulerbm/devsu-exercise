import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ProductInterface } from "../../Data/types/types";
import {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../../Data/api/apiService";

interface ProductsContextProps {
  products: ProductInterface[];
  singleProduct: ProductInterface | null;
  isLoading: boolean;
  setSingleProduct: React.Dispatch<
    React.SetStateAction<ProductInterface | null>
  >;
  fetchProducts: () => Promise<void>;
  handleGetSingleProduct: (productId: string) => Promise<void>;
  setShouldFetchSingleProduct: (value: boolean) => void;
  setShouldFetchProducts: (value: boolean) => void;
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

  const [shouldFetchProducts, setShouldFetchProducts] = useState(false);
  const [shouldFetchSingleProduct, setShouldFetchSingleProduct] =
    useState(false);

  //GET REQUESTS:
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (shouldFetchProducts) {
      fetchProducts();
      setShouldFetchProducts(false);
    }
    if (shouldFetchSingleProduct) {
      fetchSingleProduct();
      setShouldFetchSingleProduct(false);
    }
  }, [shouldFetchProducts, shouldFetchSingleProduct]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSingleProduct = async () => {
    if (!singleProduct) return;
    try {
      setIsLoading(true);
      const response = await getSingleProduct(singleProduct.id);
      setSingleProduct(response);
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
      setSingleProduct(product);
    } catch (error) {
      console.error("Error fetching single product:", error);
      setSingleProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  //MUTATIONS:
  const handleCreateProduct = async (productData: ProductInterface) => {
    try {
      setIsLoading(true);
      await createProduct(productData);
      setShouldFetchProducts(true);
    } catch (error) {
      console.error("Error creating product: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (productData: ProductInterface) => {
    try {
      setIsLoading(true);
      await updateProduct(productData);
      setShouldFetchSingleProduct(true);
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
        setShouldFetchProducts,
        setShouldFetchSingleProduct,
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
