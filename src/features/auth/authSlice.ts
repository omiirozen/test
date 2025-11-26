import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;


export const loginUser = (email: string, password: string) => async (dispatch: any) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email: email,
        name: email.split("@")[0],
      };

      await AsyncStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      return { success: true };
    } else {
      throw new Error("Неверный email или пароль");
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const registerUser = (email: string, password: string, name: string) => async (dispatch: any) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password.length >= 6 && name) {
      const user: User = {
        id: Date.now().toString(),
        email: email,
        name: name,
      };

      await AsyncStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      return { success: true };
    } else {
      throw new Error("Заполните все поля корректно");
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const checkAuth = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const userString = await AsyncStorage.getItem("user");
    
    if (userString) {
      const user = JSON.parse(userString);
      dispatch(setUser(user));
    } else {
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.error("Check auth error:", error);
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch: any) => {
  await AsyncStorage.removeItem("user");
  dispatch(logout());
};

export default authSlice.reducer;