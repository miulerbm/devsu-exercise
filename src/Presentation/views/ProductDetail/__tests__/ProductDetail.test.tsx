import { describe, expect, test, beforeEach, jest } from "@jest/globals";
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { RootStackParamList } from "../../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import ProductDetailScreen from "../ProductDetail";
import { ProductsProvider } from "../../../../Domain/context/ProductsContext";
import { NavigationContainer } from "@react-navigation/native";
import { getSingleProduct } from "../../../../Data/api/apiService";
import { ProductInterface } from "../../../../Data/types/types";

jest.mock("../../../../Data/api/apiService");

type NavigationScreenPropAlias = StackNavigationProp<
  RootStackParamList,
  "ProductDetailScreen"
>;

const Wrapper = ({ children }: any) => {
  return <ProductsProvider>{children}</ProductsProvider>;
};

describe("ProductDetailScreen", () => {
  const mockProduct: ProductInterface = {
    id: "uno",
    name: "Producto 1",
    description: "Descripción del producto 1",
    logo: "assets1",
    date_release: new Date("2024-06-10"),
    date_revision: new Date("2025-06-10"),
  };

  beforeEach(() => {
    (getSingleProduct as jest.Mock).mockResolvedValue(mockProduct as never);
  });

  test("renders product details with mock data correctly", async () => {
    const navigation: Partial<NavigationScreenPropAlias> = {
      navigate: jest.fn(),
    };

    const route = {
      key: "mock-key",
      name: "ProductDetailScreen",
      params: { id: "uno" },
    };

    const { getByText, getByPlaceholderText } = render(
      <Wrapper>
        <NavigationContainer>
          <ProductDetailScreen
            navigation={navigation as NavigationScreenPropAlias}
            route={route as any}
          />
        </NavigationContainer>
      </Wrapper>
    );

    expect(getByText("Espere...")).toBeTruthy();

    await waitFor(() => {
      expect(getByText("[Producto 1]")).toBeTruthy();
    });

    expect(getByText("[Descripción del producto 1]")).toBeTruthy();
    expect(getByText("Editar")).toBeTruthy();
    expect(getByText("Eliminar")).toBeTruthy();
  });
});
