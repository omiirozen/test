import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

interface UploadedFile {
  name: string;
  uri: string;
  remoteUrl?: string;
}

const MOCK_UPLOAD_ENDPOINT = "https://httpbin.org/post";

const FilesScreen: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);

  const pickFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({});
    if (res.canceled) return;

    const file = res.assets[0];
    setFiles((prev) => [...prev, { name: file.name, uri: file.uri }]);
  };

  const uploadFile = async (file: UploadedFile) => {
    try {
      setLoading(true);

      const result = await (FileSystem as any).uploadAsync(
        MOCK_UPLOAD_ENDPOINT,
        file.uri,
        {
          fieldName: "file",
          httpMethod: "POST",
          uploadType: (FileSystem as any).FileSystemUploadType.MULTIPART,
        }
      );

      console.log("UPLOAD RESULT", result);

      const updated: UploadedFile = {
        ...file,
        remoteUrl: "https://httpbin.org/image/png",
      };

      setFiles((prev) =>
        prev.map((f) => (f.uri === file.uri ? updated : f))
      );

      Alert.alert("Успех", "Файл загружен");
    } catch (e: any) {
      Alert.alert("Ошибка загрузки", e.message || "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (file: UploadedFile) => {
    if (!file.remoteUrl) {
      Alert.alert("Нет ссылки", "Сначала загрузите файл");
      return;
    }

    try {
      setLoading(true);

      const dir =
        (FileSystem as any).documentDirectory ??
        (FileSystem as any).cacheDirectory;

      const fileUri = dir + (file.name || "downloaded-file");

      const res = await FileSystem.downloadAsync(
        file.remoteUrl,
        fileUri
      );

      Alert.alert("Сохранено", res.uri);
    } catch (e: any) {
      Alert.alert("Ошибка скачивания", e.message || "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 40, paddingHorizontal: 16 }}>
      <TouchableOpacity
        onPress={pickFile}
        style={{
          backgroundColor: "#2563eb",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Выбрать файл
        </Text>
      </TouchableOpacity>

      {loading && <Text>Загрузка / скачивание...</Text>}

      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              marginVertical: 6,
              borderRadius: 8,
              backgroundColor: "#f3f4f6",
            }}
          >
            <Text style={{ marginBottom: 4 }}>{item.name}</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                onPress={() => uploadFile(item)}
                style={{
                  backgroundColor: "#22c55e",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "#fff" }}>Загрузить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => downloadFile(item)}
                style={{
                  backgroundColor: "#0f172a",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "#fff" }}>Скачать</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default FilesScreen;

