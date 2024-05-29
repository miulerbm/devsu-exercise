import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import styles from "./Styles";
interface Props
  extends StackScreenProps<RootStackParamList, "ProductDetailScreen"> {}

import React from "react";
import { Image, Text, View } from "react-native";
import Header from "../../components/Header";
import GrayDivider from "../../components/GrayDivider";

const singleProduct = {
  id: "string1",
  name: "Nombre",
  description:
    "Descripción del producto Descripción del producto Descripción del producto Descripción del producto Descripción del producto Descripción del producto",
  logo: "https://via.placeholder.com/200",
  date_release: "2023-01-01",
  date_revision: "2024-01-01",
};

const ProductDetailScreen = () => {
  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <Header title="BANCO" />
        <GrayDivider />
        <View style={styles.idContainer}>
          <Text style={styles.idText}>ID: {singleProduct.id}</Text>
          <Text style={styles.extraInfo}>
            Información adicional sobre el ID
          </Text>
        </View>

        <View style={styles.productDetailsContainer}>
          <View style={styles.infoField}>
            <Text>Nombre</Text>
            <Text style={{ fontWeight: "bold" }}>[{singleProduct.name}]</Text>
          </View>

          <View style={styles.infoField}>
            <Text>Descripción</Text>
            <Text style={{ fontWeight: "bold", maxWidth: "60%" }}>
              [{singleProduct.description}]
            </Text>
          </View>

          <View style={styles.logoContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: "blue",
              }}
            >
              <Text style={styles.logoText}>Logo</Text>
            </View>
            <View style={{ alignSelf: "center", marginVertical: 12 }}>
              <Image
                source={{ uri: singleProduct.logo }}
                style={styles.logoImage}
              />
            </View>
          </View>
          <Text style={styles.dateText}>
            Fecha de liberación: {singleProduct.date_release}
          </Text>
          <Text style={styles.dateText}>
            Fecha de revisión: {singleProduct.date_revision}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;
