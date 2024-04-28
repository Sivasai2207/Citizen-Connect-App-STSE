import { router, useGlobalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { blurhash } from "../../constants";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import dayjs from "dayjs";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { AuthContext } from "../../context/authcontext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteStory } from "../../constants/api";

var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const Story = () => {
  const { last24H, user } = useContext(AuthContext);

  const { id } = useGlobalSearchParams();

  const [index, setIndex] = useState(
    last24H.findIndex((story) => story.id === id) || 0
  );

  const { image, userName, profileUrl, date, caption, userId } = last24H[index];

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      onSwipe={(direction, state) => {
        const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_DOWN } = swipeDirections;
        if (direction === SWIPE_LEFT) {
          if (index < last24H.length - 1) {
            setIndex(index + 1);
          }
        } else if (direction === SWIPE_RIGHT) {
          if (index > 0) {
            setIndex(index - 1);
          }
        } else if (direction === SWIPE_DOWN) {
          router.back();
        }
      }}
      config={config}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            marginBottom: 15,
            marginTop: 10,
            minHeight: 40,
            top: 20,
            left: 20,
            zIndex: 3,
            width: widthPercentageToDP(100),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: heightPercentageToDP(5),
              aspectRatio: 1,
              borderRadius: 50,
              backgroundColor: "#0553",
            }}
            source={profileUrl}
            placeholder={blurhash}
            transition={200}
          />
          <View
            style={{
              marginLeft: 12,
              width: widthPercentageToDP(80),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RNText
                style={{
                  color: "#fff",
                }}
                font={"Poppins-Bold"}
              >
                {userName}
                {" ·"}
              </RNText>
              <RNText
                font={"Poppins-Bold"}
                style={{
                  color: "#eee",
                  marginTop: -2,
                  marginLeft: 3,
                  fontSize: 10.5,
                  lineHeight: 14,
                }}
              >
                {dayjs(+date).fromNow(true)}
              </RNText>
            </View>

            {userId === user?.id && (
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "Delete",
                    "Are you sure you want to delete this story?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: async () => {
                          deleteStory(id);
                          router.navigate("/home");
                        },
                      },
                    ]
                  );
                }}
                style={{
                  position: "absolute",
                  right: 60,
                }}
              >
                <MaterialCommunityIcons name="delete" size={24} color="white" />
              </Pressable>
            )}

            <Pressable
              onPress={() => {
                router.back();
              }}
              style={{
                position: "absolute",
                right: 20,
              }}
            >
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <Image
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(40),
            backgroundColor: "#0553",
          }}
          source={image}
          placeholder={blurhash}
          transition={200}
        />

        {caption !== "" && (
          <RNText
            style={{
              color: "#fff",
              position: "absolute",
              bottom: 32,
              fontSize: 17.5,
              lineHeight: 24.5,
              paddingHorizontal: 14,
            }}
          >
            {caption}
          </RNText>
        )}
        <View style={[styles.overlay, { height: heightPercentageToDP(100) }]} />
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    position: "relative",
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.15,
    backgroundColor: "black",
    width: widthPercentageToDP(100),
  },
});

export default Story;
