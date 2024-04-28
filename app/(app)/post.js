import React, { useContext, useMemo, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import Chip, {
  COMPLETED,
  READY_FOR_COMPLETION,
  REJECTED,
} from "../../components/Chip";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  blurhash,
  departmants,
  readyState,
  rejectedState,
  states,
} from "../../constants";
import dayjs from "dayjs";
import { MaterialIcons } from "@expo/vector-icons";
import Timeline from "../../components/Timeline";
import Colors from "../../constants/Colors";
import SmallNotification from "../../components/SmallNotification";
import { AuthContext } from "../../context/authcontext";
import { updatePost } from "../../constants/api";
import Loading from "../../components/Loading";

const Post = () => {
  const { user } = useContext(AuthContext);
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
    id,
    userName,
    images,
  } = useGlobalSearchParams();

  const [loading, setLoading] = useState(false);
  const { notifications } = useContext(AuthContext);
  const imageUrl = image?.includes("firebase")
    ? image.toString().replace(/\/(?=[^\/]*$)/, "%2F")
    : image;
  const profileUrlU = profileUrl?.includes("firebase")
    ? profileUrl.toString().replace(/\/(?=[^\/]*$)/, "%2F")
    : profileUrl;

  const theStages =
    stage === READY_FOR_COMPLETION
      ? readyState
      : stage === REJECTED
      ? rejectedState
      : states;

  const memoizedNotifications = useMemo(
    () => notifications.filter((notification) => notification.postId === id),
    [notifications]
  );
  const parsedImage = JSON.parse(images);
  const allImages = parsedImage.map((image) =>
    image.includes("firebase")
      ? image.toString().replace(/\/(?=[^\/]*$)/, "%2F")
      : image
  );
  console.log(allImages);
  const updateStage = async () => {
    setLoading(true);
    const { success: successUpdate } = await updatePost(id, {
      stage: COMPLETED,
    });
    setLoading(false);
    if (successUpdate) {
      router.back();
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View>
        <View
          style={{
            bottom: 10,
            right: 30,
            position: "absolute",
            zIndex: 30,
          }}
        >
          <Image
            style={{
              width: 38,
              height: 38,
              borderRadius: 20,
            }}
            source={departmants[department]}
            placeholder={blurhash}
            transition={500}
          />
        </View>

        {allImages?.length > 0 ? (
          <>
            <FlatList
              data={allImages}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Image
                  style={{
                    height: heightPercentageToDP(40),
                    width: widthPercentageToDP(100),
                    backgroundColor: "#0553",
                  }}
                  source={item}
                  placeholder={blurhash}
                  transition={200}
                />
              )}
              keyExtractor={(item) => item}
            />
            <View
              style={{
                bottom: -30,
                right: 0,
                position: "absolute",
                zIndex: 30,
              }}
            >
              <View
                style={[
                  styles.container,
                  {
                    backgroundColor: "#111",
                  },
                ]}
              >
                <RNText style={styles.text}>{allImages.length} images</RNText>
              </View>
            </View>
          </>
        ) : (
          <Image
            style={{
              height: heightPercentageToDP(40),
              backgroundColor: "#0553",
            }}
            source={imageUrl}
            placeholder={blurhash}
            transition={200}
          />
        )}
      </View>

      <View
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 3,
          backgroundColor: "#fff",
          width: 34,
          height: 34,
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name={"keyboard-arrow-left"}
          size={32}
          color={"black"}
          onPress={() => router.back()}
        />
      </View>

      <View
        style={{
          padding: widthPercentageToDP(4),
          position: "relative",
        }}
      >
        <RNText
          style={{
            fontSize: 26.25,
            lineHeight: 31.5,
          }}
          font={"Poppins-Bold"}
        >
          {title}
        </RNText>

        <View
          style={{
            marginBottom: 15,
            marginTop: 10,
            minHeight: 40,
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
            source={profileUrlU}
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
                  · {dayjs(+date).fromNow()}
                </RNText>
              </View>

              <RNText
                style={{
                  fontFamily: "Poppins-SemiBold",
                  marginLeft: 1,
                  color: "#9ca3af",
                  marginTop: -2,
                  fontSize: 12,
                  width: widthPercentageToDP(80),
                }}
              >
                {location}
              </RNText>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: widthPercentageToDP(22),
                gap: 2,
              }}
            >
              <Image
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 20,
                }}
                source={departmants[department]}
                placeholder={blurhash}
                transition={500}
              />

              <RNText
                font={"Poppins-Medium"}
                style={{
                  fontSize: 13,
                  color: "#111",
                }}
              >
                {department}
              </RNText>
            </View>
          </View>
        </View>
        <RNText
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 10.5,
            lineHeight: 14,
          }}
          numberOfLines={3}
        >
          {content}
        </RNText>
      </View>
      {/* justify-end flex-1 */}

      <View>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            margin: 5,
            padding: 10,
            paddingBottom: 20,
            gap: 10,
            borderRadius: 5,
          }}
        >
          <Timeline currentState={stage} states={theStages} />
        </View>
      </View>
      {stage === READY_FOR_COMPLETION ? (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              flex: 1,
            }}
          >
            <Chip stage={stage} />
          </View>
          {userId === user?.id && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginVertical: 20,
                justifyContent: "flex-end",
              }}
            >
              {loading ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Loading size={heightPercentageToDP(6.5)} />
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#34d399",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 5,
                    width: widthPercentageToDP(70),
                  }}
                  onPress={updateStage}
                  textStyle={{
                    color: "#fff",
                  }}
                >
                  <RNText style={styles.text}>Mark as Completed</RNText>
                </TouchableOpacity>
              )}
            </View>
          )}
        </>
      ) : (
        <>
          {memoizedNotifications.length > 0 ? (
            <FlatList
              data={memoizedNotifications}
              renderItem={({ item }) => (
                <SmallNotification notification={item} />
              )}
              keyExtractor={(item) => item.id}
              style={{
                marginVertical: 10,
              }}
            />
          ) : (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 8,
                paddingBottom: 2,
                justifyContent: "center",
                flex: 1,
              }}
            >
              <RNText
                style={{
                  fontSize: 15.75,
                  lineHeight: 24.5,
                  textAlign: "center",
                }}
                font={"Poppins-Bold"}
              >
                No notifications yet
              </RNText>
            </View>
          )}
        </>
      )}

      {/* Create Buttons for cancel and completing the request */}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    letterSpacing: 0.5,
    fontSize: 10.5,
    lineHeight: 14,
  },
});
