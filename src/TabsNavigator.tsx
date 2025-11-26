import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppDispatch } from "./store/hooks";
import { logoutUser } from "./features/auth/authSlice";

import NewsListScreen from "./screens/NewsListScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FilesScreen from "./screens/FilesScreen";

const Tab = createBottomTabNavigator();

export default function TabsNavigator({ onLogout }: { onLogout: () => void }) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert("Выход", "Вы уверены?", [
      { text: "Отмена", onPress: () => {} },
      {
        text: "Выход",
        onPress: async () => {
          await dispatch(logoutUser() as any);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: 16,
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#111827" }}>
          Новости
        </Text>

        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: "#fee2e2",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#dc2626", fontWeight: "600", fontSize: 12 }}>
            Выйти
          </Text>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#6b7280",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
          },
        }}
      >
        <Tab.Screen
          name="News"
          component={NewsListScreen}
          options={{ tabBarLabel: "Новости" }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ tabBarLabel: "Избранное" }}
        />
        <Tab.Screen
          name="Files"
          component={FilesScreen}
          options={{ tabBarLabel: "Файлы" }}
        />
      </Tab.Navigator>
    </View>
  );
}