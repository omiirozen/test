import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Article } from "../../types/news";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NewsState {
  favorites: Article[];
}

const initialState: NewsState = {
  favorites: []
};

const FAVORITES_KEY = "favorites_articles";

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Article[]>) {
      state.favorites = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<Article>) {
      const exists = state.favorites.find((a) => a.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(
          (a) => a.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    }
  }
});

export const { toggleFavorite, setFavorites } = newsSlice.actions;

export async function loadFavoritesFromStorage(dispatch: any) {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (raw) {
      const parsed: Article[] = JSON.parse(raw);
      dispatch(setFavorites(parsed));
    }
  } catch (e) {
    console.warn("Failed to load favorites", e);
  }
}

export default newsSlice.reducer;
