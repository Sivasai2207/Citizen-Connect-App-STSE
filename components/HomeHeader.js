import { View, RNText, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ios = Platform.OS === "ios";

import { Image } from "expo-image";
import { blurhash } from "../constants";

const HomeHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: ios ? top : top + 10,
        paddingBottom: 14,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <RNText>Home</RNText>
        <Image
          style={{
            height: hp(4.3),
            aspectRatio: 1,
            borderRadius: 100,
            backgroundColor: "#0553",
          }}
          source="https://picsum.photos/seed/696/3000/2000"
          placeholder={blurhash}
          transition={500}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
