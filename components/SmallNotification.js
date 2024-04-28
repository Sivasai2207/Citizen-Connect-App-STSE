import { Image, ScrollView, View } from "react-native";
import React, { useContext } from "react";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { RenderHTML } from "react-native-render-html";
import RNText from "./RNText";
import Colors from "../constants/Colors";
import dayjs from "dayjs";
const SmallNotification = ({ notification }) => {
  return (
    <View
      key={notification.id}
      style={{
        backgroundColor: "#f9f9f9",
        margin: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginLeft: 10,
          gap: -2,
        }}
      >
        <View
          style={{
            width: widthPercentageToDP(90),
            marginVertical: -10,
          }}
        >
          <RenderHTML
            contentWidth={widthPercentageToDP(100)}
            baseStyle={{
              fontFamily: "Poppins-Regular",
              fontSize: 13,
            }}
            tagsStyles={{
              strong: {
                fontFamily: "Poppins-Bold",
                color: Colors.green,
                fontWeight: "bold",
              },
            }}
            source={{ html: notification.theContent }}
          />
        </View>
        <RNText
          style={{
            color: Colors.mediumGray,
            fontSize: 12,
          }}
          font={"Poppins-Medium"}
        >
          {notification.remark}
        </RNText>
        <RNText
          style={{
            color: Colors.mediumGray,
            marginTop: 4,
            fontSize: 10.5,
            lineHeight: 14,
          }}
          font={"Poppins-Medium"}
        >
          {dayjs(notification.createdAt).fromNow()}
        </RNText>
      </View>
    </View>
  );
};

export default SmallNotification;
