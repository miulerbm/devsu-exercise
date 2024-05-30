import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductsProvider } from "./src/Domain/context/ProductsContext";
import ProductDetailScreen from "./src/Presentation/views/ProductDetail/ProductDetail";
import ProductFormScreen from "./src/Presentation/views/ProductForm/ProductForm";
import ProductListScreen from "./src/Presentation/views/ProductList/ProductList";
import Layout from "./layout";

export type RootStackParamList = {
  ProductListScreen: undefined;
  ProductDetailScreen: { id: string };
  ProductFormScreen: { id?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ProductsProvider>
      <NavigationContainer>
        <Layout>
          <Stack.Navigator screenOptions={{ animation: "none" }}>
            <Stack.Screen
              name="ProductListScreen"
              component={ProductListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductFormScreen"
              component={ProductFormScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </Layout>
      </NavigationContainer>
    </ProductsProvider>
  );
}
