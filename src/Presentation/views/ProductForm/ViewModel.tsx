import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import { useProducts } from "../../../Domain/context/ProductsContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../../Data/validators/validators";
import moment from "moment";
import { Platform } from "react-native";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductFormScreen"> {}

const ProductFormViewModel = ({ navigation, route }: Props) => {
  const {
    singleProduct,
    setSingleProduct,
    isLoading,
    handleCreateProduct,
    handleUpdateProduct,
    handleGetSingleProduct,
  } = useProducts();

  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { control, handleSubmit, setValue, reset, watch, trigger } = useForm({
    resolver: zodResolver(formSchema),
  });

  let paramId = null;

  useEffect(() => {
    if (route.params.id) {
      paramId = route.params.id;
      setIsEditing(true);
      handleGetSingleProduct(paramId);
    } else {
      setIsEditing(false);
      setSingleProduct(null);
    }
  }, [route.params.id, isEditing]);

  const fillValues = () => {
    if (singleProduct) {
      setValue("id", singleProduct.id);
      setValue("name", singleProduct.name);
      setValue("description", singleProduct.description);
      setValue("logo", singleProduct.logo);
      const formattedReleaseDate = moment
        .utc(new Date(singleProduct!.date_release))
        .format("YYYY-MM-DD");

      const formattedRevisionDate = moment
        .utc(new Date(singleProduct!.date_revision))
        .format("YYYY-MM-DD");

      const releaseDate = new Date(formattedReleaseDate);
      releaseDate.setHours(releaseDate.getHours() + 15);

      const revisionDate = new Date(formattedRevisionDate);
      revisionDate.setHours(revisionDate.getHours() + 15);

      setValue("date_release", releaseDate);
      setValue("date_revision", revisionDate);
    }
  };

  useEffect(() => {
    fillValues();
  }, [singleProduct]);

  const dateRelease = watch("date_release");

  useEffect(() => {
    if (dateRelease) {
      const dateRevision = moment.utc(dateRelease).add(1, "year").toDate();
      setValue("date_revision", dateRevision);
      trigger("date_revision");
    }
  }, [dateRelease]);

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        id: data.id.trim(),
        date_release: moment.utc(data.date_release).format("YYYY-MM-DD"),
        date_revision: moment.utc(data.date_revision).format("YYYY-MM-DD"),
      };

      if (isEditing) {
        handleUpdateProduct(formattedData);
      } else {
        handleCreateProduct(formattedData);
      }
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    reset();
    if (singleProduct) {
      fillValues();
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 60,
  });

  return {
    isEditing,
    singleProduct,
    offsetKeyboard,
    control,
    setShowDatePicker,
    showDatePicker,
    handleSubmit,
    onSubmit,
    isLoading,
    handleReset,
  };
};
export default ProductFormViewModel;
