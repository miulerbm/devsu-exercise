import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import Header from "../../components/Header";
import GrayDivider from "../../components/GrayDivider";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../../Data/validators/validators";
import Button from "../../components/Button";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createProduct } from "../../../Data/api/apiService";

interface Props
  extends StackScreenProps<RootStackParamList, "ProductFormScreen"> {}

const ProductFormScreen = ({ navigation, route }: Props) => {
  const defaultValues = {
    id: "defaultID",
    nombre: "defaultName",
    descripcion: "defaultDescription",
    logo: "defaultURL",
    date_release: null, // Fecha de liberación actual
    date_revision: null,
  };

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, setValue, reset, watch, trigger } = useForm({
    resolver: zodResolver(formSchema),
  });

  const dateRelease = watch("date_release");
  useEffect(() => {
    if (dateRelease) {
      const dateRevision = moment(dateRelease).add(1, "year").toDate();
      setValue("date_revision", dateRevision);
      trigger("date_revision");
    }
  }, [dateRelease, setValue]);

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const formattedData = {
        ...data,
        date_release: moment(data.date_release).format("YYYY-MM-DD"),
        date_revision: moment(data.date_revision).format("YYYY-MM-DD"),
      };
      console.log("formattedData", formattedData);

      const response = await createProduct(formattedData);
      console.log("Response:", response);
      Alert.alert("Producto creado exitosamente");
    } catch (error: any) {
      console.error("Error:", error);
      Alert.alert("Hubo un error al crear el producto");
    } finally {
      setIsLoading(false);
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleReset = () => {
    reset();
  };

  return (
    <View style={styles.screenContainer}>
      <Header title="BANCO" />
      <GrayDivider />

      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "padding"}
          keyboardVerticalOffset={offsetKeyboard}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.formContainer}>
              <View style={styles.formField}>
                <Text>ID</Text>
                <Controller
                  control={control}
                  name={"id"}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
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
                        style={styles.input}
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
                        style={styles.input}
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
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <View style={styles.inputContainer}>
                      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <View style={styles.inputDate}>
                          <Text>
                            {value
                              ? moment(value).format("DD/MM/YYYY")
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
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          { color: "#A0A0A0", fontSize: 14 },
                        ]}
                        placeholder="Elija una fecha de liberación"
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
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{ gap: 16 }}>
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
