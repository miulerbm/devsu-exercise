import React from "react";
import { describe, expect, test, beforeEach, jest } from "@jest/globals";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { RootStackParamList } from "../../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import ProductFormScreen from "../ProductForm";
import { ProductsProvider } from "../../../../Domain/context/ProductsContext";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("../../../../Domain/context/ProductsContext", () => ({
  useProducts: jest.fn(() => ({
    singleProduct: null,
    setSingleProduct: jest.fn(),
    isLoading: false,
    fetchProducts: jest.fn(),
    handleGetSingleProduct: jest.fn(),
    handleCreateProduct: jest.fn(),
    handleUpdateProduct: jest.fn(),
    handleDeleteProduct: jest.fn(),
  })),
}));

type NavigationScreenPropAlias = StackNavigationProp<
  RootStackParamList,
  "ProductFormScreen"
>;

const Wrapper = ({ children }: any) => {
  return <ProductsProvider>{children}</ProductsProvider>;
};

describe("ProductFormScreen", () => {
  test("renderiza correctamente el formulario", () => {
    const navigation: Partial<NavigationScreenPropAlias> = {
      navigate: jest.fn(),
    };
    const route = {
      key: "mock-key",
      name: "ProductFormScreen",
    };
    const { getByText, getByPlaceholderText } = render(
      <Wrapper>
        <NavigationContainer>
          <ProductFormScreen
            navigation={navigation as NavigationScreenPropAlias}
            route={route as any}
          />
        </NavigationContainer>
      </Wrapper>
    );

    expect(getByText("Formulario de Registro")).toBeTruthy();
    expect(getByText("ID")).toBeTruthy();
    expect(getByText("Nombre")).toBeTruthy();
  });

  // it("permite editar los campos correctamente", () => {
  //   const { getByPlaceholderText } = render(
  //     <ProductsProvider>
  //       <ProductFormScreen
  //         navigation={navigation as NavigationScreenPropAlias}
  //         route={route as any}
  //       />
  //     </ProductsProvider>
  //   );

  //   const idInput = getByPlaceholderText("ID");
  //   fireEvent.changeText(idInput, "nuevo-id");
  //   expect(idInput.props.value).toBe("nuevo-id");
  // });

  // it("muestra mensajes de error de validación correctamente", async () => {
  //   const { getByPlaceholderText, getByText } = render(
  //     <ProductsProvider>
  //       <ProductFormScreen
  //         navigation={navigation as NavigationScreenPropAlias}
  //         route={route as any}
  //       />
  //     </ProductsProvider>
  //   );

  //   const idInput = getByPlaceholderText("ID");
  //   fireEvent.changeText(idInput, "");

  //   await waitFor(() => {
  //     expect(getByText("Este campo es requerido")).toBeTruthy();
  //   });
  // });
});
