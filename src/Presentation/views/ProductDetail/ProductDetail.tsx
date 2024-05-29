import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import styles from "./Styles";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import Header from "../../components/Header";
import GrayDivider from "../../components/GrayDivider";
import { ProductInterface } from "../../../Data/types/types";
import { getSingleProduct } from "../../../Data/api/apiService";
import Button from "../../components/Button";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductDetailScreen"> {}

const ProductDetailScreen = ({ navigation, route }: Props) => {
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productId = route.params.id;
        // console.log("productId", productId);
        const singleProduct = await getSingleProduct(productId);
        setProduct(singleProduct);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  // console.log("product", product);

  if (loading) {
    return (
      <View style={styles.screenContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <Header title="BANCO" />
      <GrayDivider />
      <View style={{ flex: 1 }}>
        <View style={styles.idContainer}>
          <Text style={styles.idText}>ID: {product!.id}</Text>
          <Text style={styles.extraInfo}>Información extra</Text>
        </View>

        <View style={styles.productDetailsContainer}>
          <View style={styles.infoField}>
            <Text style={styles.extraInfo}>Nombre</Text>
            <Text style={{ fontWeight: "bold" }}>[{product!.name}]</Text>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.extraInfo}>Descripción</Text>
            <Text style={{ fontWeight: "bold", maxWidth: "60%" }}>
              [{product!.description}]
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
                source={{ uri: "https://via.placeholder.com/100" }}
              />
            </View>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.extraInfo}>Fecha liberación</Text>
            <Text style={{ fontWeight: "bold", maxWidth: "60%" }}>
              [{product!.date_release.toString()}]
            </Text>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.extraInfo}>Fecha revisión</Text>
            <Text style={{ fontWeight: "bold", maxWidth: "60%" }}>
              [{product!.date_revision.toString()}]
            </Text>
          </View>
        </View>
      </View>
      <View style={{ gap: 16 }}>
        <Button title="Editar" type="secondary" />
        <Button title="Eliminar" type="danger" />
      </View>
    </View>
  );
};

export default ProductDetailScreen;
