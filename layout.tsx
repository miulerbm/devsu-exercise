import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <View style={styles.layout}>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginTop: 25,
    padding: 10,
  },
  container: {
    flex: 1,
    margin: 10,
    borderWidth: 2,
    borderColor: "black",
    gap: 20,
  },
});

export default Layout;
