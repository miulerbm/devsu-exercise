import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Icon name="money" />
      <Text>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
