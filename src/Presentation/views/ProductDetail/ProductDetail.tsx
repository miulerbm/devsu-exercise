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
  logo: "https://via.placeholder.com/100",
  date_release: "2023-01-01",
  date_revision: "2024-01-01",
};

const ProductDetailScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Header title="BANCO" />
      <GrayDivider />
      <View style={styles.idContainer}>
        <Text style={styles.idText}>ID: {singleProduct.id}</Text>
        <Text style={styles.extraInfo}>Información extra</Text>
      </View>

      <View style={styles.productDetailsContainer}>
        <View style={styles.infoField}>
          <Text style={styles.extraInfo}>Nombre</Text>
          <Text style={{ fontWeight: "bold" }}>[{singleProduct.name}]</Text>
        </View>

        <View style={styles.infoField}>
          <Text style={styles.extraInfo}>Descripción</Text>
          <Text style={{ fontWeight: "bold", maxWidth: "60%" }}>
            [{singleProduct.description}]
          </Text>
        </View>

        <View style={styles.logoContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.extraInfo}>Logo</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              style={styles.logoImage}
              source={{ uri: singleProduct.logo }}
            />
          </View>
        </View>

        <View style={styles.infoField}>
          <Text style={styles.extraInfo}>Fecha liberación</Text>
          <Text style={{ fontWeight: "bold", maxWidth: "60%" }}>
            [{singleProduct.date_release}]
          </Text>
        </View>

        <View style={styles.infoField}>
          <Text style={styles.extraInfo}>Fecha revisión</Text>
          <Text style={{ fontWeight: "bold", maxWidth: "60%" }}>
            [{singleProduct.date_revision}]
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;
