import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "./src/Presentation/views/ProductList/ProductList";

export type RootStackParamList = {
  ProductListScreen: undefined;
  // ProductDetailScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductListScreen"
          component={ProductListScreen}
          options={({ route, navigation }) => ({
            headerShown: false,
          })}
        />
        {/* <Stack.Screen name="ProductDetailScreen"/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
