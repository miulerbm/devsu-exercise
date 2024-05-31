import { useEffect, useState } from "react";
import { ProductInterface } from "../../../Data/types/types";
import { useProducts } from "../../../Domain/context/ProductsContext";

const ProductListViewModel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );
  const [refreshing, setRefreshing] = useState(false);
  const { products, isLoading, setSingleProduct, fetchProducts } =
    useProducts();

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    applySearchFilter();
  }, [searchQuery]);

  const applySearchFilter = () => {
    if (products) {
      if (!searchQuery) {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(
          (product) =>
            product.id
              .toLowerCase()
              .includes(searchQuery.toLowerCase().trim()) ||
            product.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase().trim())
        );
        setFilteredProducts(filtered);
      }
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts().finally(() => setRefreshing(false));
  };
  return {
    searchQuery,
    filteredProducts,
    refreshing,
    isLoading,
    setSearchQuery,
    handleRefresh,
    setSingleProduct,
  };
};

export default ProductListViewModel;
