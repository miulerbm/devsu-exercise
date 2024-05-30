import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

interface HeaderProps {
  title: string;
  goBack?: boolean;
}

const Header = ({ title, goBack }: HeaderProps) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (goBack) {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.headerContainer}>
      {goBack ? (
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-back" color="#000080" size={16} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: "10%" }} />
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon color={"#000080"} name="money" />
        <Text style={{ fontWeight: "bold", color: "#000080" }}>{title}</Text>
      </View>
      <View style={{ width: "10%" }} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  backButton: {
    width: "10%",
    borderRadius: 10,
    borderWidth: 2,
  },
});
