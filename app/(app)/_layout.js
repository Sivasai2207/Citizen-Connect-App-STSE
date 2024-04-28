import React from "react";
import { Stack } from "expo-router";
import { Alert, Linking, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import RNText from "../../components/RNText";

export default AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="post"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="story"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Edit Profile",
          headerTitleAlign: "left",
          headerRight: () => (
            <Pressable
              onPress={() => {
                Alert.alert(
                  "Delete Account",
                  "Are you sure you want to delete your account?",
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        // navigate to webview to delete account
                        Linking.openURL("https://citizen-connect.blogspot.com");
                      },
                    },
                    {
                      text: "No",
                    },
                  ]
                );
              }}
            >
              <RNText
                style={{
                  color: Colors.red,

                  fontSize: 12,
                }}
                font={"Poppins-Bold"}
              >
                Delete Account
              </RNText>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          headerTitle: "Notifications",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};
