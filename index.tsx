import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import { Text, View } from "react-native";
import App from './App';
import { store } from "./src/store";

function AppWithStore() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello World! Приложение работает!</Text>
      </View>
    </Provider>
  );
}

registerRootComponent(App);