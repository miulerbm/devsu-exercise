import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
          <Image
            style={{ height: 16, width: 16 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/271/271220.png",
            }}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: "10%" }} />
      )}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Image
          style={{ height: 20, width: 20 }}
          source={{
            uri: "https://cdn-icons-png.freepik.com/256/6871/6871596.png",
          }}
        />
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
    alignItems: "center",
  },
});
