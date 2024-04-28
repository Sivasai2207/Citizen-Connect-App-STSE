import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../context/authcontext";
import { useContext } from "react";
import { View } from "react-native";

export default function TabsLayout() {
  const { newNotification, setNewNotification } = useContext(AuthContext);
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.background },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarActiveBackgroundColor: Colors.background,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerShadowVisible: false,
        tabBarLabel: () => null,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "CitizenConnect",
          title: "CitizenConnect",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          headerRight: () => {
            return (
              <View>
                {newNotification && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: "red",
                      borderRadius: 100,
                      position: "absolute",
                      top: -4,
                      right: 21,
                    }}
                  />
                )}

                <Feather
                  name="bell"
                  size={24}
                  color={Colors.primary}
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    router.push("/notification");
                    setNewNotification(false);
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          headerTitle: "Create Complaint",
          title: "Create Complaint",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="vote-outline"
              size={size + 4.5}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          headerTitle: "Add Story",
          title: "Add Story",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={size + 2}
              style={{
                marginTop: 2,
              }}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          title: "My Profile",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),

          headerLeft: () => {
            return (
              <MaterialIcons
                name="edit"
                size={24}
                color={Colors.primary}
                style={{ marginLeft: 10 }}
                onPress={() => {
                  //route to proflie edit page
                  router.push("/profile");
                }}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
