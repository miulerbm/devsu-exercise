import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../../App";
import { ProductInterface } from "../../../Data/types/types";
import Button from "../../components/Button";
import GrayDivider from "../../components/GrayDivider";
import Header from "../../components/Header";
import styles from "./Styles";
import useViewModel from "./ViewModel";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductListScreen"> {}

const ProductListScreen = ({ navigation }: Props) => {
  const {
    filteredProducts,
    handleRefresh,
    refreshing,
    searchQuery,
    setSearchQuery,
    isLoading,
    setSingleProduct,
  } = useViewModel();

  const renderProduct = ({ item }: { item: ProductInterface }) => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("ProductDetailScreen", { id: item.id })
      }
    >
      <View style={styles.productItem}>
        <View>
          <Text style={{ color: "black" }}>{item.name}</Text>
          <Text style={{ color: "#A0A0A0" }}>ID: {item.id}</Text>
        </View>
        <Text style={styles.arrowButton}>{">"}</Text>
      </View>
    </TouchableOpacity>
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

      {!filteredProducts || filteredProducts.length === 0 ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            <Text style={styles.noProductsText}>
              Sin resultados (Agregue un producto o Deslice para cargar más)
            </Text>
          </ScrollView>
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

      <View style={styles.buttonContainer}>
        <Button
          title="Agregar"
          onPress={() => {
            setSingleProduct(null);
            navigation.navigate("ProductFormScreen", {});
          }}
          isDisabled={isLoading}
        />
      </View>
    </View>
  );
};

export default ProductListScreen;
