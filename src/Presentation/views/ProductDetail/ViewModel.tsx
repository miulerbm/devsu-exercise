import { useEffect, useState } from "react";
import { useProducts } from "../../../Domain/context/ProductsContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductDetailScreen"> {}

const ProductDetailViewModel = ({ navigation, route }: Props) => {
  const { singleProduct, handleGetSingleProduct, isLoading } = useProducts();
  let paramId = null;

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params.id) {
      paramId = route.params.id;
      handleGetSingleProduct(paramId);
    }
  }, [route.params.id]);

  return {
    singleProduct,
    modalVisible,
    isLoading,
    setModalVisible,
  };
};
export default ProductDetailViewModel;
