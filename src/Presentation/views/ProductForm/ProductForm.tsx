import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Control, Controller, FieldValues, useForm } from "react-hook-form";
import Header from "../../components/Header";
import GrayDivider from "../../components/GrayDivider";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../../Data/validators/validators";
import Button from "../../components/Button";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createProduct, getSingleProduct } from "../../../Data/api/apiService";
import { ProductInterface } from "../../../Data/types/types";
import { useProducts } from "../../../Domain/context/ProductsContext";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductFormScreen"> {}

const ProductFormScreen = ({ navigation, route }: Props) => {
  const {
    singleProduct,
    setSingleProduct,
    isLoading,
    handleCreateProduct,
    handleUpdateProduct,
    handleGetSingleProduct,
    setShouldFetchProducts,
    setShouldFetchSingleProduct,
  } = useProducts();

  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { control, handleSubmit, setValue, reset, watch, trigger } = useForm({
    resolver: zodResolver(formSchema),
  });

  let paramId = null;

  useEffect(() => {
    console.log("id", route.params.id);
    console.log("isEditing", isEditing);

    if (route.params.id) {
      paramId = route.params.id;
      console.log("existe param id");
      setIsEditing(true);
      handleGetSingleProduct(paramId);
    } else {
      setIsEditing(false);
      setSingleProduct(null);
    }
  }, [route.params.id, isEditing]);

  useEffect(() => {
    if (singleProduct) {
      setValue("id", singleProduct.id);
      setValue("name", singleProduct.name);
      setValue("description", singleProduct.description);
      setValue("logo", singleProduct.logo);
      setValue("date_release", new Date(singleProduct.date_release));
      setValue("date_revision", new Date(singleProduct.date_revision));
    }
  }, [singleProduct]);

  const dateRelease = watch("date_release");
  useEffect(() => {
    if (dateRelease) {
      const dateRevision = moment(dateRelease).add(1, "year").toDate();
      setValue("date_revision", dateRevision);
      trigger("date_revision");
    }
  }, [dateRelease]);

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        date_release: moment(data.date_release).format("YYYY-MM-DD"),
        date_revision: moment(data.date_revision).format("YYYY-MM-DD"),
      };

      if (isEditing) {
        handleUpdateProduct(formattedData);
        setShouldFetchSingleProduct(true);
        setShouldFetchProducts(true);
      } else {
        handleCreateProduct(formattedData);
        setShouldFetchProducts(true);
      }
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    reset();
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 60,
  });

  const renderFormFields = (
    control: Control<FieldValues, any>,
    setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>,
    showDatePicker: boolean
  ) => (
    <>
      <View style={styles.formField}>
        <Text>ID</Text>
        <Controller
          control={control}
          name={"id"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View
              style={[
                styles.inputContainer,
                isEditing && { backgroundColor: "#F5F5F5" },
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  error && { borderColor: "red", borderWidth: 1 },
                  isEditing && { color: "#A0A0A0" },
                ]}
                placeholderTextColor="#999"
                editable={!isEditing}
                defaultValue={singleProduct ? singleProduct.id : ""}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                textAlignVertical="top"
              />

              {error && (
                <Text style={styles.errorMessage}>{error.message}</Text>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.formField}>
        <Text>Nombre</Text>
        <Controller
          control={control}
          name={"name"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  error && { borderColor: "red", borderWidth: 1 },
                ]}
                placeholderTextColor="#999"
                defaultValue={singleProduct ? singleProduct.name : ""}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                textAlignVertical="top"
              />

              {error && (
                <Text style={styles.errorMessage}>{error.message}</Text>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.formField}>
        <Text>Descripción</Text>
        <Controller
          control={control}
          name={"description"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  error && { borderColor: "red", borderWidth: 1 },
                ]}
                placeholderTextColor="#999"
                defaultValue={singleProduct ? singleProduct.description : ""}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                textAlignVertical="top"
              />

              {error && (
                <Text style={styles.errorMessage}>{error.message}</Text>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.formField}>
        <Text>Logo</Text>
        <Controller
          control={control}
          name={"logo"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  error && { borderColor: "red", borderWidth: 1 },
                ]}
                defaultValue={singleProduct ? singleProduct.logo : ""}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                textAlignVertical="top"
              />

              {error && (
                <Text style={styles.errorMessage}>{error.message}</Text>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.formField}>
        <Text>Fecha de Liberación</Text>
        <Controller
          control={control}
          name={"date_release"}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View
                  style={[
                    styles.inputDate,
                    error && { borderColor: "red", borderWidth: 1 },
                  ]}
                >
                  <Text>
                    {value
                      ? moment(value).format("DD/MM/YYYY")
                      : singleProduct
                      ? moment(singleProduct.date_release).format("DD/MM/YYYY")
                      : "Elija una fecha"}
                  </Text>
                </View>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value || new Date()}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    onChange(selectedDate || value);
                    console.log("selectedDate", selectedDate);
                  }}
                />
              )}
              {error && (
                <Text style={styles.errorMessage}>{error.message}</Text>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.formField}>
        <Text>Fecha de Revisión</Text>
        <Controller
          control={control}
          name="date_revision"
          render={({ field: { value }, fieldState: { error } }) => (
            <View style={[styles.inputContainer]}>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: "#A0A0A0",
                    fontSize: 14,
                    backgroundColor: "#F5F5F5",
                  },
                  error && { borderColor: "red", borderWidth: 1 },
                ]}
                placeholder={
                  singleProduct
                    ? moment(singleProduct.date_revision).format("DD/MM/YYYY")
                    : "Elija una fecha de liberación"
                }
                placeholderTextColor="#999"
                value={value ? moment(value).format("DD/MM/YYYY") : ""}
                editable={false}
                textAlignVertical="top"
              />
              {error && (
                <Text style={styles.errorMessage}>{error.message}</Text>
              )}
            </View>
          )}
        />
      </View>
    </>
  );

  if (!singleProduct && isEditing) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.screenContainer}>
      <Header title="BANCO" />
      <GrayDivider />
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "serif",
          }}
        >
          Formulario de Registro
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={offsetKeyboard}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={styles.formContainer}>
            {renderFormFields(control, setShowDatePicker, showDatePicker)}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <Button
          title="Enviar"
          onPress={handleSubmit(onSubmit)}
          isDisabled={isLoading}
        />
        <Button title="Reiniciar" onPress={handleReset} type="secondary" />
      </View>
    </View>
  );
};

export default ProductFormScreen;
