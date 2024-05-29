import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../../../App";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./Styles";
import Header from "../../components/Header";
import GrayDivider from "../../components/GrayDivider";
import Button from "../../components/Button";
import { getProducts } from "../../../Data/api/apiService";
import { ProductInterface } from "../../../Data/types/types";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductListScreen"> {}

const ProductListScreen = ({ navigation, route }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );
  const [refreshing, setRefreshing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      console.log("Fetching products...");
      const response = await getProducts();
      console.log("response", response);
      setProducts(response);
      setFilteredProducts(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsFetching(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    applySearchFilter();
  }, [searchQuery, products]);

  const applySearchFilter = () => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchProducts();
    }, 2000);
  };

  const renderProduct = ({ item }: { item: ProductInterface }) => (
    <View style={styles.productItem}>
      <View>
        <Text style={{ color: "black" }}>{item.name}</Text>
        <Text style={{ color: "#A0A0A0" }}>ID: {item.id}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetailScreen")}
      >
        <Text style={styles.arrowButton}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <Header title="BANCO" />
      <GrayDivider />
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {isFetching ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#0000ff"
        />
      ) : filteredProducts.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.noProductsText}>
            Sin resultados (Agregue un producto)
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </View>
      )}

      <Button
        title="Agregar"
        onPress={() => navigation.navigate("ProductFormScreen")}
        isDisabled={isFetching}
      />
    </View>
  );
};

export default ProductListScreen;
