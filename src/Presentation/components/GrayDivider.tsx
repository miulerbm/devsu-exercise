import React from "react";
import { StyleSheet, View } from "react-native";

const GrayDivider = () => {
  return <View style={styles.divider} />;
};

export default GrayDivider;
const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#D9D9D9",
  },
});
