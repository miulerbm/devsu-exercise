import { StackScreenProps } from "@react-navigation/stack";
import moment from "moment";
import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { RootStackParamList } from "../../../../App";
import Button from "../../components/Button";
import GrayDivider from "../../components/GrayDivider";
import Header from "../../components/Header";
import { DeleteModal } from "../ProductForm/components/DeleteModal";
import styles from "./Styles";
import useViewModel from "./ViewModel";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductDetailScreen"> {}

const ProductDetailScreen = ({ navigation, route }: Props) => {
  const { singleProduct, modalVisible, setModalVisible, isLoading } =
    useViewModel({
      navigation,
      route,
    });

  if (!singleProduct) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#A0A0A0" />
        <Text>Espere...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <Header title="BANCO" goBack={true} />
      <GrayDivider />
      <View style={{ flex: 1 }}>
        <View style={styles.idContainer}>
          <Text style={styles.idText}>ID: {singleProduct!.id}</Text>
          <Text style={styles.extraInfo}>Información extra</Text>
        </View>

        <View style={styles.productDetailsContainer}>
          <View style={styles.infoField}>
            <Text style={styles.extraInfo}>Nombre</Text>
            <Text style={{ fontWeight: "bold" }}>[{singleProduct!.name}]</Text>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.extraInfo}>Descripción</Text>
            <Text style={{ fontWeight: "bold", maxWidth: "60%" }}>
              [{singleProduct!.description}]
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
              [{moment(singleProduct!.date_release).format("DD/MM/YYYY")}]
            </Text>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.extraInfo}>Fecha revisión</Text>
            <Text style={{ fontWeight: "bold", maxWidth: "60%" }}>
              [{moment(singleProduct!.date_revision).format("DD/MM/YYYY")}]
            </Text>
          </View>
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <Button
          title="Editar"
          type="secondary"
          onPress={() =>
            navigation.navigate("ProductFormScreen", { id: singleProduct?.id })
          }
        />
        <Button
          title="Eliminar"
          type="danger"
          isDisabled={singleProduct ? false : true}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <DeleteModal
        product={singleProduct}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
        navigation={navigation}
      />
    </View>
  );
};

export default ProductDetailScreen;
