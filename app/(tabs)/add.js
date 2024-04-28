import { View, Pressable, Alert, TextInput, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import AddStory from "../../components/AddStory";
import { AuthContext } from "../../context/authcontext";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { blurhash } from "../../constants";
import { useRouter } from "expo-router";
import { addStory } from "../../constants/api";
import Loading from "../../components/Loading";
import { SvgFromXml } from "react-native-svg";
import story from "../../assets/svg/story";
const Add = () => {
  const { user } = useContext(AuthContext);

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("image", image);
  const upateProfile = (url) => {
    setImage(url);
  };

  const [caption, setCaption] = useState("");
  const handleStory = async () => {
    setLoading(true);
    const { success, msg } = await addStory(
      {
        image,
        userId: user.id,
        userName: user.name,
        profileUrl: user.profileUrl,
        date: Date.now(),
        caption,
      },
      user.id
    );
    if (success) {
      Alert.alert("Success", "Story Created successfully", [
        {
          text: "OK",
          onPress: () => {
            setImage("");
            router.navigate("/home");
          },
        },
      ]);
    } else {
      Alert.alert("Error", msg);
    }
    setLoading(false);
  };
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image !== "" ? (
          <>
            <Image
              style={{
                width: wp(95),
                aspectRatio: 1,
                backgroundColor: "#0553",
              }}
              source={image}
              placeholder={blurhash}
              transition={500}
            />
            <>
              {loading ? (
                <Loading size={hp(8.5)} />
              ) : (
                <View
                  style={{
                    paddingHorizontal: 20,
                  }}
                >
                  {/* add text feild to enter comments */}
                  <RNText
                    style={{
                      marginVertical: 7,
                      textAlign: "center",
                      fontSize: 17.5,
                      lineHeight: 24.5,
                    }}
                    font={"Poppins-Medium"}
                  >
                    Caption
                  </RNText>
                  <TextInput
                    placeholder="Caption..."
                    style={{
                      borderWidth: 2,
                      marginTop: -7,
                      borderColor: "#D1D5DB",
                      borderRadius: 5,
                      padding: 7,
                      width: "100%",
                      textAlignVertical: "top",
                      width: widthPercentageToDP(90),
                    }}
                    multiline={true}
                    numberOfLines={4}
                    value={caption}
                    onChangeText={setCaption}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        setImage("");
                      }}
                      style={{
                        marginTop: 20,
                        backgroundColor: "#000",
                        borderRadius: 5,
                        width: "50%",
                      }}
                    >
                      <RNText
                        style={{
                          fontSize: hp(2),
                          color: "#fff",
                          textAlign: "center",
                          padding: 7,
                          borderRadius: 5,
                        }}
                        font={"Poppins-Bold"}
                      >
                        Retake
                      </RNText>
                    </Pressable>
                    <Pressable
                      onPress={handleStory}
                      style={{
                        marginTop: 20,
                        marginLeft: 10,
                        backgroundColor: "#3B82F6",
                        borderRadius: 5,
                        width: "50%",
                        marginLeft: 7,
                      }}
                    >
                      <RNText
                        style={{
                          fontSize: hp(2),
                          color: "#fff",
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: 7,
                          borderRadius: 5,
                        }}
                        font={"Poppins-Bold"}
                      >
                        Add to Story
                      </RNText>
                    </Pressable>
                  </View>
                </View>
              )}
            </>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgFromXml
              xml={story}
              width={widthPercentageToDP(90)}
              height={400}
              style={{
                marginLeft: 20,
              }}
            />

            <AddStory id={user.id} upateProfile={upateProfile} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Add;
