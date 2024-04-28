import { Image } from "expo-image";
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import { router } from "expo-router";
import dayjs from "dayjs";
import RNText from "./RNText";
import Chip from "./Chip";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const Item = ({ item }) => {
  const {
    content,
    date,
    image,
    profileUrl,
    stage,
    title,
    department,
    location,
    userId,
    userName,
    id,
    // if images is not present, set it to empty array
    images,
  } = item;
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "post",
          params: {
            content,
            date,
            image,
            profileUrl,
            stage,
            title,
            department,
            location,
            userId,
            userName,
            id,
            images:
              images?.length > 0 ? JSON.stringify(images) : JSON.stringify([]),
          },
        });
      }}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
      }}
    >
      <View
        style={{
          marginBottom: 10,
          minHeight: 40,
          width: wp(100),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: hp(5),
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RNText font={"Poppins-Bold"}>{userName} </RNText>
              <RNText
                font={"Poppins-Bold"}
                style={{
                  color: "#9ca3af",

                  marginTop: -2,
                  marginLeft: 3,
                  fontSize: 10.5,
                  lineHeight: 14,
                }}
              >
                · {dayjs(date).fromNow()}
              </RNText>
            </View>

            <RNText
              numberOfLines={1}
              style={{
                fontFamily: "Poppins-SemiBold",
                marginLeft: 1,
                color: "#9ca3af",
                marginTop: 1,
                fontSize: 12,

                width: wp(70),
              }}
            >
              {location}
            </RNText>
          </View>
        </View>
      </View>
      <View
        style={{
          gap: 3,
          position: "relative",
        }}
      >
        <RNText
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 10.5,
            lineHeight: 14,
          }}
          //3 lines
          numberOfLines={2}
        >
          {title}
        </RNText>
        <Image
          style={{
            height: hp(28),
            maxWidth: wp(100),
            borderRadius: 4,
            backgroundColor: "#0553",
          }}
          source={image}
          placeholder={blurhash}
          transition={200}
        />
        <View
          style={{
            bottom: 5,
            right: 5,
            position: "absolute",
            zIndex: 30,
          }}
        >
          <Chip stage={stage} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PostList = (props) => {
  return (
    <View
      style={{
        padding: 7,
      }}
    >
      {props.data.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </View>
  );
};

export default PostList;
