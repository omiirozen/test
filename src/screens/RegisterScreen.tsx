import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAppDispatch } from "../store/hooks";
import { registerUser } from "../features/auth/authSlice";

const RegisterScreen: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    const result = await dispatch(registerUser(email, password, name) as any);

    if (!result.success) {
      setError(result.error || "Ошибка регистрации");
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          backgroundColor: "#f9fafb",
        }}
      >
        <View style={{ marginBottom: 48, alignItems: "center" }}>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#111827", marginBottom: 8 }}>
            Регистрация 
          </Text>
          <Text style={{ fontSize: 16, color: "#6b7280" }}>
            Создайте новый аккаунт
          </Text>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 }}>
            Имя
          </Text>
          <TextInput
            placeholder="Ваше имя"
            value={name}
            onChangeText={setName}
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          />
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 }}>
            Email
          </Text>
          <TextInput
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 }}>
            Пароль
          </Text>
          <TextInput
            placeholder="Минимум 6 символов"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          />
        </View>

        {error ? (
          <View style={{ backgroundColor: "#fee2e2", padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ color: "#dc2626", fontSize: 14 }}>{error}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#93c5fd" : "#2563eb",
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Зарегистрироваться
            </Text>
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#6b7280", fontSize: 14 }}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={onSwitchToLogin}>
            <Text style={{ color: "#2563eb", fontSize: 14, fontWeight: "600" }}>Войти</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;