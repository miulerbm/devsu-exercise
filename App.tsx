import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "./src/Presentation/views/ProductList/ProductList";
import ProductDetailScreen from "./src/Presentation/views/ProductDetail/ProductDetail";
import ProductFormScreen from "./src/Presentation/views/ProductForm/ProductForm";
import { ProductsProvider } from "./src/Domain/context/ProductsContext";

export type RootStackParamList = {
  ProductListScreen: undefined;
  ProductDetailScreen: { id: string };
  ProductFormScreen: { id?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <ProductsProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ animation: "none" }}>
              <Stack.Screen
                name="ProductListScreen"
                component={ProductListScreen}
                options={({ route, navigation }) => ({
                  headerShown: false,
                })}
              />
              <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
                options={({ route, navigation }) => ({
                  headerShown: false,
                })}
              />
              <Stack.Screen
                name="ProductFormScreen"
                component={ProductFormScreen}
                options={({ route, navigation }) => ({
                  headerShown: false,
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ProductsProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginTop: 25,
    padding: 10,
  },
  container: {
    flex: 1,
    margin: 10,
    borderWidth: 2,
    borderColor: "black",
    gap: 20,
  },
});
