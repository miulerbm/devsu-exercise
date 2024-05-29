import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { RootStackParamList } from "../../../../App";
import {
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
import { ProductInterface } from "../../../Data/types";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductListScreen"> {}

const productData = [
  {
    id: "string1",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
  {
    id: "string2",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
  {
    id: "string3",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
  {
    id: "string4",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
  {
    id: "string5",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
  {
    id: "string6",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
  {
    id: "string7",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
  {
    id: "string8",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
  {
    id: "string9",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
  {
    id: "string10",
    name: "Nombre",
    description: "string",
    logo: "string",
    date_release: "Date",
    date_revision: "Date",
  },
];

const ProductListScreen = ({ navigation, route }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      setFilteredProducts(
        productData.filter((product) => product.id.includes(text))
      );
    } else {
      setFilteredProducts(productData);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setFilteredProducts(productData);
      setRefreshing(false);
    }, 2000);
  };

  const renderProduct = ({ item }: any) => (
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
    <View style={styles.layout}>
      <View style={styles.container}>
        <Header title="BANCO" />
        <GrayDivider />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default ProductListScreen;
