import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    console.log("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token");
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  console.log("Push token:", token.data);

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX
    });
  }
}


export async function notifyAboutNewArticles(count: number) {
  if (count <= 0) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Новые новости",
      body: `Появилось ${count} новых новостей`
    },
    trigger: null
  });
}
