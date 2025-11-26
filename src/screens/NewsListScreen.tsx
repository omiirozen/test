import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { fetchNews } from "../api/newsApi"; 
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  toggleFavorite,
  loadFavoritesFromStorage,
} from "../features/news/newsSlice";
import type { Article } from "../types/news";
import { notifyAboutNewArticles } from "../services/pushNotifications";

const NewsListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.news.favorites);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async (pageNum: number, searchQuery?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchNews(pageNum, searchQuery);
      
      const newArticles: Article[] = data.articles?.map((a: any, idx: number) => ({
        ...a,
        id: a.url ?? `article-${idx}-${pageNum}`,
      })) ?? [];

      if (pageNum === 1) {
        setArticles(newArticles);
      } else {
        setArticles(prev => [...prev, ...newArticles]);
      }

      if (newArticles.length > 0 && Platform.OS !== "web") {
        notifyAboutNewArticles(newArticles.length);
      }
    } catch (e: any) {
      console.error("Error loading news:", e);
      setError(e.message || "Ошибка загрузки новостей");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(1, query);
  }, [query]);

  useEffect(() => {
    loadFavoritesFromStorage(dispatch);
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadNews(nextPage, query);
    }
  }, [loading, page, query]);

  const onSearch = () => {
    setPage(1);
    setQuery(searchText);
  };

  const onRefresh = () => {
    setPage(1);
    loadNews(1, query);
  };

  if (error && articles.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 18, color: "#ef4444", marginBottom: 10 }}>
          Ошибка загрузки новостей
        </Text>
        <Text style={{ color: "#6b7280", textAlign: "center", marginBottom: 20 }}>
          {error}
        </Text>
        <TouchableOpacity
          onPress={onRefresh}
          style={{
            backgroundColor: "#2563eb",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff" }}>Попробовать снова</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Article }) => {
    const isFavorite = favorites.some((f) => f.id === item.id);

    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 16,
          marginVertical: 10,
          borderRadius: 12,
          backgroundColor: "#fff",
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          overflow: "hidden",
        }}
        onPress={() =>
          navigation.navigate("Article", {
            articleUrl: item.url,
            id: item.id,
          })
        }
      >
     
        {item.urlToImage ? (
          <Image
            source={{ uri: item.urlToImage }}
            style={{ 
              width: "100%", 
              height: 400,
              backgroundColor: "#e5e7eb" 
            }}
            resizeMode="cover"
          />
        ) : (
          <View 
            style={{ 
              width: "100%", 
              height: 240,
              backgroundColor: "#e5e7eb",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#9ca3af", fontSize: 16 }}>📰</Text>
            <Text style={{ color: "#9ca3af", fontSize: 8, marginTop: 8 }}>
              Нет изображения
            </Text>
          </View>
        )}

      
        <View style={{ padding: 16 }}>
          <Text 
            style={{ 
              fontWeight: "bold", 
              fontSize: 24, 
              marginBottom: 16,
              lineHeight: 24,
              color: "#111827"
            }}
          >
            {item.title}
          </Text>

          <Text 
            numberOfLines={3} 
            style={{ 
              marginBottom: 12, 
              color: "#6b7280",
              fontSize: 18,
              lineHeight: 20
            }}
          >
            {item.description}
          </Text>


          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: "#f3f4f6"
            }}
          >
            <Text style={{ fontSize: 14, color: "#9ca3af" }}>
              {new Date(item.publishedAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </Text>

            <TouchableOpacity 
              onPress={() => dispatch(toggleFavorite(item))}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: isFavorite ? "#fef3c7" : "#f3f4f6"
              }}
            >
              <Text 
                style={{ 
                  fontSize: 16,
                  marginRight: 4,
                  color: isFavorite ? "#f59e0b" : "#9ca3af" 
                }}
              >
                {isFavorite ? "★" : "☆"}
              </Text>
              <Text 
                style={{ 
                  fontSize: 13,
                  fontWeight: "600",
                  color: isFavorite ? "#f59e0b" : "#6b7280" 
                }}
              >
                {isFavorite ? "Сохранено" : "Сохранить"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
    
      <View
        style={{
          paddingTop: 50,
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <TextInput
            placeholder="Поиск новостей..."
            value={searchText}
            onChangeText={setSearchText}
            style={{
              flex: 1,
              backgroundColor: "#f3f4f6",
              borderRadius: 10,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 15,
              color: "#111827"
            }}
          />

          <TouchableOpacity
            onPress={onSearch}
            style={{
              backgroundColor: "#2563eb",
              borderRadius: 10,
              paddingHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
              Найти
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading && page === 1 ? (
        <View style={{ marginTop: 60 }}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={{ textAlign: "center", marginTop: 12, color: "#6b7280" }}>
            Загрузка новостей...
          </Text>
        </View>
      ) : articles.length === 0 ? (
        <View
          style={{
            marginTop: 60,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 40,
          }}
        >
          <Text style={{ fontSize: 48, marginBottom: 16 }}>📰</Text>
          <Text style={{ fontSize: 16, color: "#6b7280", textAlign: "center" }}>
            Нет статей по вашему запросу
          </Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingVertical: 8 }}
          refreshControl={
            <RefreshControl 
              refreshing={loading && page === 1} 
              onRefresh={onRefresh}
              tintColor="#2563eb"
              colors={["#2563eb"]}
            />
          }
          ListFooterComponent={
            loading && page > 1 ? (
              <ActivityIndicator 
                style={{ marginVertical: 20 }} 
                color="#2563eb" 
              />
            ) : null
          }
        />
      )}
    </View>
  );
};

export default NewsListScreen;