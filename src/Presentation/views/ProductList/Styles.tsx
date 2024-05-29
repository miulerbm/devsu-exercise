import { StyleSheet } from "react-native";

const ProductListStyles = StyleSheet.create({
  layout: {
    flex: 1,
    marginTop: 25,
    padding: 10,
  },
  container: {
    flex: 1,
    margin: 10,
    borderWidth: 2,
    padding: 20,
    borderColor: "black",
    gap: 20,
  },

  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 16,
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  arrowButton: {
    fontSize: 24,
    color: "#A0A0A0",
    textAlignVertical: "center",
  },
});

export default ProductListStyles;
