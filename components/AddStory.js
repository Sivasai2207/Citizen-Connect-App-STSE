import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React from "react";
import {
  ActivityIndicator,
  Share,
  Text,
  View,
  Platform,
  Pressable,
} from "react-native";
//import v4 from "uuid";

import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import { saveProfileUrl } from "../constants/api";
import { storage } from "../firebase";
import RNText from "./RNText";
// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example

export default class AddStory extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  render() {
    return (
      <View
        style={{
          alignItems: this.state.uploading ? "center" : "flex-end",
          justifyContent: "center",
          padding: 20,
          flex: 1,
          flexDirection: "row",
          width: wp(100),
          gap: 4,
        }}
      >
        {this._maybeRenderUploadingOverlay()}
        {!this.state.uploading && (
          <View
            style={{
              borderRadius: 10,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: "#fff",
              gap: 12,
              width: wp(95),
            }}
          >
            <Pressable
              style={{
                minWidth: wp(50),
                backgroundColor: "#3B82F6",
                borderRadius: 5,
              }}
              onPress={this._takePhoto}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 7,
                  borderRadius: 5,
                }}
              >
                Camera
              </Text>
            </Pressable>
            <Pressable
              style={{
                minWidth: wp(50),
                backgroundColor: "#000",
                borderRadius: 5,
              }}
              onPress={this._pickImage}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 7,
                  borderRadius: 5,
                }}
              >
                Photos
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={{
            // backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
            height: hp(30),
            width: wp(80),
          }}
        >
          <ActivityIndicator animating size="large" />
          <RNText
            style={{
              marginTop: 14,
              fontSize: 17.5,
              lineHeight: 24.5,
            }}
            font={"Poppins-Bold"}
          >
            Uploading...
          </RNText>
        </View>
      );
    }
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
        if (uploadUrl) {
          this.setState({ image: uploadUrl });
          // const response = await saveProfileUrl(this.props.id, uploadUrl);
          // if (response) {
          this.props.upateProfile(uploadUrl);
          // }
        }
      }
    } catch (e) {
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(storage, `images/${Date.now().toString(36)}`);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
