import { StyleSheet } from "react-native";

const ProductDetailStyles = StyleSheet.create({
  layout: {
    flex: 1,
    marginTop: 25,
    padding: 10,
  },
  container: {
    flex: 1,
    margin: 10,
    borderWidth: 2,
    padding: 10,
    borderColor: "black",
  },
  infoField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  idContainer: {
    marginTop: 32,
    marginBottom: 16,
  },
  idText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  extraInfo: {
    fontSize: 14,
    color: "#666",
  },
  productDetailsContainer: {
    marginTop: 16,
  },
  productName: {
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: "column",
  },
  imageContainer: {
    height: 100,
    alignItems: "center",
    marginVertical: 10,
  },
  logoText: {
    fontSize: 16,
    marginRight: 8,
  },
  logoImage: {
    height: 100,
    width: 100,
    flex: 1,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});

export default ProductDetailStyles;
