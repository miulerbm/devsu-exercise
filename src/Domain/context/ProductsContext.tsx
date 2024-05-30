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
} from "../../Data/api/apiService";

interface ProductsContextProps {
  products: ProductInterface[];
  singleProduct: ProductInterface | null;
  isFetchingProducts: boolean;
  setSingleProduct: React.Dispatch<
    React.SetStateAction<ProductInterface | null>
  >;
  fetchProducts: () => Promise<void>;
  handleGetSingleProduct: (productId: string) => Promise<void>;
  setShouldFetchSingleProduct: (value: React.SetStateAction<boolean>) => void;
  setShouldFetchProducts: (value: React.SetStateAction<boolean>) => void;
  handleCreateProduct: (productData: ProductInterface) => Promise<void>;
  handleUpdateProduct: (productData: ProductInterface) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined
);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts deben estar dentro de un ProductsProvider");
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
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [isFetchingSingleProducts, setIsFetchingSingleProduct] =
    useState(false);

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
    } else if (shouldFetchSingleProduct) {
      fetchSingleProduct();
      setShouldFetchSingleProduct(false);
    }
  }, [shouldFetchProducts, shouldFetchSingleProduct]);

  const fetchProducts = async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        setIsFetchingProducts(true);
        const response = await getProducts();
        setProducts(response);
        resolve();
        setIsFetchingProducts(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        reject();
      }
    });
  };

  const fetchSingleProduct = async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        setIsFetchingSingleProduct(true);
        const response = await getSingleProduct(singleProduct?.id!);
        setSingleProduct(response);
        resolve();
        setIsFetchingSingleProduct(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        reject();
      }
    });
  };

  const handleGetSingleProduct = async (productId: string) => {
    try {
      const product = await getSingleProduct(productId);
      setSingleProduct(product);
    } catch (error) {
      console.error("Error fetching single product:", error);
      setSingleProduct(null);
    }
  };

  //MUTATIONS:
  const handleCreateProduct = async (productData: ProductInterface) => {
    try {
      await createProduct(productData);
      setShouldFetchProducts(true);
    } catch (error) {
      console.error("Error creating product: ", error);
    }
  };

  const handleUpdateProduct = async (productData: ProductInterface) => {
    try {
      await updateProduct(productData);
      setShouldFetchSingleProduct(true);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        singleProduct,
        isFetchingProducts,
        handleUpdateProduct,
        setSingleProduct,
        fetchProducts,
        setShouldFetchProducts,
        setShouldFetchSingleProduct,
        handleCreateProduct,
        handleGetSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
