
import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

export default function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={{ marginTop: 15, fontSize: 16 }}>Загрузка...</Text>
    </View>
  );
}
