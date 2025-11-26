import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAppDispatch } from "../store/hooks";
import { loginUser } from "../features/auth/authSlice";

export default function LoginScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Ошибка", "Заполните все поля");
      return;
    }

    setLoading(true);
    const result = await dispatch(loginUser(email, password) as any);
    setLoading(false);

    if (!result.success) {
      Alert.alert("Ошибка входа", result.error || "Неизвестная ошибка");
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 80, backgroundColor: "#f9fafb" }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 8, color: "#111827" }}>
        Вход
      </Text>
      <Text style={{ fontSize: 16, color: "#6b7280", marginBottom: 32 }}>
        Введите ваши данные для входа
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#e5e7eb",
          borderRadius: 10,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 16,
          fontSize: 16,
          color: "#111827",
        }}
      />

      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#e5e7eb",
          borderRadius: 10,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 24,
          fontSize: 16,
          color: "#111827",
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{
          backgroundColor: "#2563eb",
          borderRadius: 10,
          paddingVertical: 12,
          alignItems: "center",
          marginBottom: 16,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Войти
          </Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ color: "#6b7280", fontSize: 14 }}>Нет аккаунта? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#2563eb", fontSize: 14, fontWeight: "600" }}>
            Зарегистрируйтесь
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}