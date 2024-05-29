import { StyleSheet } from "react-native";

const ProductListStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    gap: 16,
  },

  formContainer: {
    flex: 1,
    marginTop: 20,
    gap: 10,
  },

  formField: {
    gap: 4,
  },

  inputContainer: {
    marginTop: 5,
  },

  input: {
    width: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },

  errorMessage: {
    color: "red",
    marginTop: 5,
  },
  inputDate: {
    width: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
    color: "#333",
    textAlignVertical: "top",
    paddingBottom: 10,
  },
});

export default ProductListStyles;
