import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { toggleFavorite } from "../features/news/newsSlice";
import type { Article } from "../types/news";
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen: React.FC = () => {
  const favorites = useAppSelector((s) => s.news.favorites);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>(); 

  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={{
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        elevation: 2
      }}
      onPress={() =>
        navigation.navigate("Article", {  
          articleUrl: item.url,
          id: item.id
        })
      }
    >
      {item.urlToImage ? (
        <Image
          source={{ uri: item.urlToImage }}
          style={{ height: 180, borderRadius: 8, marginBottom: 8 }}
        />
      ) : null}
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>
        {item.title}
      </Text>
      <TouchableOpacity onPress={() => dispatch(toggleFavorite(item))}>
        <Text style={{ color: "#ef4444" }}>Удалить из избранного</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (!favorites.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Нет избранных статей</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ paddingTop: 40, backgroundColor: "#f3f4f6" }}
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default FavoritesScreen;
