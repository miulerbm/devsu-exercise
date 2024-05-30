import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../../../../App";
import { ProductInterface } from "../../../../Data/types/types";
import { useProducts } from "../../../../Domain/context/ProductsContext";
import Button from "../../../components/Button";
import Modal from "react-native-modal";
interface Props {
  product: ProductInterface;
  modalUseState: boolean;
  setModalUseState: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: StackNavigationProp<
    RootStackParamList,
    "ProductDetailScreen",
    undefined
  >;
}

export const DeleteModal = ({
  product,
  modalUseState,
  setModalUseState,
  navigation,
}: Props) => {
  const { handleDeleteProduct, isLoading } = useProducts();

  const handleDelete = (product: ProductInterface) => {
    handleDeleteProduct(product.id);
    setModalUseState(!modalUseState);
    navigation.goBack();
  };
  return (
    <Modal isVisible={modalUseState}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>
          ¿Deseas eliminar el {product.name}?
        </Text>
        <View style={styles.modalOptions}>
          <Button
            isDisabled={isLoading}
            title="Confirmar"
            onPress={() => {
              handleDelete(product);
              setModalUseState(!modalUseState);
            }}
          />

          <Button
            type="secondary"
            title="Cancelar"
            onPress={() => setModalUseState(!modalUseState)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalOptions: {
    width: "100%",
    padding: 10,
    flexDirection: "column",
    gap: 5,
  },
});
