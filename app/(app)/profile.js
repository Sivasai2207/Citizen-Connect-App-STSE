import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import RNText from "../../components/RNText";
import ProfileImage from "../../components/ProflieImage";
import { AuthContext } from "../../context/authcontext";
import { Image } from "expo-image";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { blurhash } from "../../constants";
import Loading from "../../components/Loading";
import { router } from "expo-router";
import { updateProflie } from "../../constants/api";

const ProfileUpdate = () => {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name);
  //   const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [bio, setBio] = useState(user?.bio);
  const [username, setUsername] = useState(user?.username);
  const [updateImage, setUpdateImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const upateProfile = (url) => {
    setUpdateImage(false);

    setUser((user) => {
      return { ...user, profileUrl: url };
    });
  };

  const handleUpdateProfile = async () => {
    if (name === "" || phone === "" || bio === "" || username === "") {
      Alert.alert("Update Profile", "All fields are required");
      return;
    } else {
      setLoading(true);
      // Implement your update profile logic here
      await updateProflie(user.id, {
        name,
        phone,
        bio,
        username,
      });
      setUser((user) => {
        return { ...user, name, phone, bio, username };
      });
      setLoading(false);
      Alert.alert("Profile Updated", "Profile updated successfully", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.secondary,
        padding: 14,
      }}
    >
      {updateImage === false ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 14,
              position: "relative",
            }}
          >
            <Image
              style={{
                height: heightPercentageToDP(18),
                aspectRatio: 1,
                borderRadius: 10,
                backgroundColor: "#0553",
              }}
              source={
                user?.profileUrl
                  ? user?.profileUrl
                  : "https://picsum.photos/seed/696/3000/2000"
              }
              placeholder={blurhash}
              transition={500}
            />
            <Pressable
              onPress={() => setUpdateImage(true)}
              style={{
                position: "absolute",
                right: heightPercentageToDP(20),
                top: -15,
                backgroundColor: "#000",
                padding: 8,
                borderRadius: 50,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="edit" size={24} color={Colors.secondary} />
            </Pressable>
          </View>
        </>
      ) : (
        <View
          style={{
            minHeight: heightPercentageToDP(35),
            paddingBottom: 20,
            position: "relative",
          }}
        >
          <Pressable
            onPress={() => setUpdateImage(false)}
            style={{
              position: "absolute",
              right: heightPercentageToDP(20),
              backgroundColor: "#000",
              padding: 8,
              borderRadius: 50,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <MaterialIcons name="close" size={24} color={Colors.secondary} />
          </Pressable>
          <ProfileImage id={user.id} upateProfile={upateProfile} />
        </View>
      )}

      <View
        style={{
          gap: 3.5,
        }}
      >
        <RNText font="Poppins-Bold">Name</RNText>
        <TextInput
          style={{
            borderWidth: 2,
            marginTop: -7,
            borderColor: "#D1D5DB",
            borderRadius: 5,
            padding: 7,
            width: "100%",
          }}
          value={name}
          onChangeText={setName}
        />
        <RNText font="Poppins-Bold">Username</RNText>
        <TextInput
          style={{
            borderWidth: 2,
            marginTop: -7,
            borderColor: "#D1D5DB",
            borderRadius: 5,
            padding: 7,
            width: "100%",
          }}
          value={username}
          onChangeText={setUsername}
        />

        {/* <RNText  font="Poppins-Bold">
          Email
        </RNText>
        <TextInput
          
          style={{
borderWidth:2,
marginTop: -7,
"borderColor":"#D1D5DB",
borderRadius: 5,
padding: 7,
width:"100%"
}}
          value={email}
          onChangeText={setEmail}
        /> */}
        <RNText font="Poppins-Bold">Phone Number</RNText>
        <TextInput
          placeholder="your number"
          style={{
            borderWidth: 2,
            marginTop: -7,
            borderColor: "#D1D5DB",
            borderRadius: 5,
            padding: 7,
            width: "100%",
          }}
          value={phone}
          onChangeText={setPhone}
        />
        <RNText font="Poppins-Bold">Bio</RNText>
        <TextInput
          placeholder="Write about yourself.."
          style={{
            borderWidth: 2,
            marginTop: -7,
            borderColor: "#D1D5DB",
            borderRadius: 5,
            padding: 7,
            width: "100%",
          }}
          value={bio}
          onChangeText={setBio}
          numberOfLines={4}
          textAlignVertical="top"
        />
        <View
          style={{
            marginBottom: 20,
            marginTop: 2.5 * 3.5,
            marginVertical: 7,
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
            <Pressable
              style={{
                backgroundColor: "#000",
                borderRadius: 5,
              }}
              onPress={handleUpdateProfile}
            >
              <RNText
                style={{
                  fontSize: heightPercentageToDP(2),
                  color: "#fff",
                  textAlign: "center",
                  padding: 7,
                  borderRadius: 5,
                }}
                font={"Poppins-Bold"}
              >
                Save
              </RNText>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileUpdate;
