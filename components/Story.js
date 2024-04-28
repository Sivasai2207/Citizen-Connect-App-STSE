import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../constants";
import { router } from "expo-router";
const Story = ({ item }) => {
  return (
    <TouchableOpacity
      style={{
        width: wp("16%"),
        height: wp("16%"),
        borderRadius: wp("16%") / 2,
        justifyContent: "center",
        alignItems: "center",
        //add black border
        borderWidth: 2,
        borderColor: "#fff",
        marginRight: wp("2%"),
      }}
      onPress={() => {
        router.push({
          pathname: "story",
          params: {
            ...item,
          },
        });
      }}
    >
      <Image
        style={{
          height: hp(7),
          aspectRatio: 1,
          borderRadius: 50,
          backgroundColor: "#0553",
        }}
        source={item.profileUrl}
        placeholder={blurhash}
        transition={200}
      />
    </TouchableOpacity>
  );
};

export default Story;
