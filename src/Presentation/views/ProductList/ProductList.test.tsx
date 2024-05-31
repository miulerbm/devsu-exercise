import { describe, expect, test } from "@jest/globals";
import React from "react";
import { render } from "@testing-library/react-native";
import { RootStackParamList } from "../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import ProductListScreen from "./ProductList";

type NavigationScreenPropAlias = StackNavigationProp<
  RootStackParamList,
  "ProductListScreen"
>;

describe("ProductListScreen", () => {
  test("renders product list correctly", async () => {
    const navigation: Partial<NavigationScreenPropAlias> = {
      navigate: jest.fn(),
    };

    const route = {
      key: "mock-key",
      name: "ProductListScreen",
    };

    const { getByText, getByPlaceholderText } = render(
      <ProductListScreen
        navigation={navigation as NavigationScreenPropAlias}
        route={route as any}
      />
    );

    expect(getByText("BANCO")).toBeTruthy();
    expect(getByPlaceholderText("Search...")).toBeTruthy();
    expect(getByText("Agregar")).toBeTruthy();
  });
});
