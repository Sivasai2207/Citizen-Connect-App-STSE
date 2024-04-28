import { Image, ScrollView, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import { widthPercentageToDP } from "react-native-responsive-screen";
import RNText from "../../components/RNText";
import RenderHtml, { RenderHTML } from "react-native-render-html";
import Colors from "../../constants/Colors";
import dayjs from "dayjs";
import { MaterialIcons } from "@expo/vector-icons";

const Notification = () => {
  const { notifications } = useContext(AuthContext);
  return (
    <ScrollView>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
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
            <Image
              source={{ uri: notification.image }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 4,
              }}
            />
            <View
              style={{
                marginLeft: 10,
                gap: -2,
              }}
            >
              <RNText font={"Poppins-Bold"}>{notification.title}</RNText>

              <View
                style={{
                  width: widthPercentageToDP(75),
                  marginVertical: -10,
                }}
              >
                <RenderHTML
                  contentWidth={widthPercentageToDP(80)}
                  // change text color to green
                  baseStyle={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 12,
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
                  width: widthPercentageToDP(75),
                }}
                font={"Poppins-Medium"}
              >
                {notification.remark?.trim()}
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
        ))
      ) : (
        <RNText
          font={"Poppins-Medium"}
          style={{
            textAlign: "center",
            padding: 7,
          }}
        >
          No Notifications
        </RNText>
      )}
    </ScrollView>
  );
};

export default Notification;
