import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../../../../App";
import { Text, View } from "react-native";
import styles from "./Styles";
import Header from "../../components/Header";
import GrayDivider from "../../components/GrayDivider";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductListScreen"> {}

const ProductListScreen = ({ navigation, route }: Props) => {
  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <Header title="BANCO" />
        <GrayDivider />
        <Text>Listado de Productos</Text>
      </View>
    </View>
  );
};

export default ProductListScreen;
