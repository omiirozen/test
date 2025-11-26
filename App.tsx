import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";

import { store } from "./src/store";
import TabsNavigator from "./src/TabsNavigator";
import AuthStack from "./AuthStack";

function AppContent() {
  const isAuthenticated = useSelector((s: any) => s.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {isAuthenticated ? (
          <TabsNavigator onLogout={() => {}} />
        ) : (
          <AuthStack onLogin={() => {}} />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
