import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title: string;
  type?: "primary" | "secondary";
  isDisabled?: boolean;
  onPress?: () => void;
}

const Button = ({
  title,
  type = "primary",
  isDisabled = false,
  onPress,
}: ButtonProps) => {
  let backgroundColor = type === "primary" ? "#FFE633" : "#EBEDEF";
  if (isDisabled) backgroundColor = "#E5E5E5"; // Se corrigió la sintaxis

  let textColor = "#000080";
  if (isDisabled) textColor = "#A0A0A0"; // Se corrigió la sintaxis

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <View
        style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}
      >
        <Text style={{ fontWeight: "bold", color: textColor }}>{title}</Text>
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
