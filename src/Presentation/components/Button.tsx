import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title: string;
  type?: "primary" | "secondary";
  onPress?: () => void;
}

const Button = ({ title, type = "primary", onPress }: ButtonProps) => {
  const backgroundColor = type === "primary" ? "#FFE633" : "#EBEDEF";

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}
      >
        <Text style={{ fontWeight: "bold", color: "#000080" }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // backgroundColor: backgroundColor,
    height: 60,
    borderRadius: 6,
  },
});
