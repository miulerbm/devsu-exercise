import React from "react";
import styles from "./Styles";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import { Text, View } from "react-native";
import Header from "../../components/Header";
import GrayDivider from "../../components/GrayDivider";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductFormScreen"> {}

const ProductFormScreen = ({ navigation, route }: Props) => {
  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <Header title="BANCO" />
        <GrayDivider />
        <Text>ProductFormScreen</Text>
      </View>
    </View>
  );
};

export default ProductFormScreen;
