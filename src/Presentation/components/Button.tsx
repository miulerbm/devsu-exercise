import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title: string;
  type?: "primary" | "secondary" | "danger";
  isDisabled?: boolean;
  onPress?: () => void;
}

const Button = ({
  title,
  type = "primary",
  isDisabled = false,
  onPress,
}: ButtonProps) => {
  let backgroundColor =
    type === "primary"
      ? "#FFE633"
      : type === "secondary"
      ? "#EBEDEF"
      : type === "danger"
      ? "#FF0000"
      : "#FFE633";

  if (isDisabled) backgroundColor = "#E5E5E5";

  let textColor = "#000080";
  if (isDisabled) {
    textColor = "#A0A0A0";
  } else if (type === "danger") {
    textColor = "#FFFFFF";
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <View
        style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}
      >
        <Text style={{ fontWeight: "bold", color: textColor }}>
          {isDisabled ? "Espere..." : title}
        </Text>
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
    height: 60,
    borderRadius: 6,
  },
});
