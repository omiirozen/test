import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const ArticleScreen: React.FC = () => {
  const route = useRoute<any>(); 
  const { articleUrl } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: articleUrl }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        )}
      />
    </View>
  );
};

export default ArticleScreen;

