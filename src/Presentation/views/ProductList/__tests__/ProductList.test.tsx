import React from "react";
import { describe, expect, test, beforeEach, jest } from "@jest/globals";
import { render, waitFor } from "@testing-library/react-native";
import { RootStackParamList } from "../../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import ProductListScreen from "../ProductList";
import { ProductsProvider } from "../../../../Domain/context/ProductsContext";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("../../../../Data/api/apiService");

type NavigationScreenPropAlias = StackNavigationProp<
  RootStackParamList,
  "ProductListScreen"
>;

const Wrapper = ({ children }: any) => {
  return <ProductsProvider>{children}</ProductsProvider>;
};

describe("ProductListScreen", () => {
  test("renderiza correctamente una lista de productos con data mockeada", async () => {
    const navigation: Partial<NavigationScreenPropAlias> = {
      navigate: jest.fn(),
    };

    const route = {
      key: "mock-key",
      name: "ProductListScreen",
    };

    const { getByText, getByPlaceholderText, findByText } = render(
      <Wrapper>
        <NavigationContainer>
          <ProductListScreen
            navigation={navigation as NavigationScreenPropAlias}
            route={route as any}
          />
        </NavigationContainer>
      </Wrapper>
    );

    expect(getByText("BANCO")).toBeTruthy();
    expect(getByPlaceholderText("Search...")).toBeTruthy();

    expect(getByText("Espere...")).toBeTruthy();

    await waitFor(() => {
      expect(getByText("Producto a")).toBeTruthy();
      expect(getByText("Producto 2")).toBeTruthy();
      expect(getByText("Producto 3")).toBeTruthy();
    });

    expect(getByText("Agregar")).toBeTruthy();
  });
});
