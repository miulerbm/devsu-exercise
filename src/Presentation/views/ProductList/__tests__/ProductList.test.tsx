import { describe, expect, test } from "@jest/globals";
import React from "react";
import { render } from "@testing-library/react-native";
import { RootStackParamList } from "../../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import ProductListScreen from "../ProductList";
import { ProductsProvider } from "../../../../Domain/context/ProductsContext";
import { NavigationContainer } from "@react-navigation/native";
import { ProductInterface } from "../../../../Data/types/types";

type NavigationScreenPropAlias = StackNavigationProp<
  RootStackParamList,
  "ProductListScreen"
>;

const Wrapper = ({ children }: any) => {
  return <ProductsProvider>{children}</ProductsProvider>;
};

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
  });
});
