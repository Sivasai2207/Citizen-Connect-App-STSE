import {
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AddStory from "../../components/AddStory";
import { AuthContext } from "../../context/authcontext";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import * as Location from "expo-location";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { blurhash } from "../../constants";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { addPost } from "../../constants/api";
import Loading from "../../components/Loading";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SvgFromXml } from "react-native-svg";
import post from "../../assets/svg/post";
import CustomKeyboardView from "../../components/CustomKeybordView";

const departmants = [
  {
    id: 1,
    name: "Water",
    icon: "https://img.icons8.com/?size=256&id=26264&format=png",
  },
  {
    id: 2,
    name: "Road",
    icon: "https://img.icons8.com/?size=256&id=DKG5EanykiIZ&format=png",
  },
  {
    id: 3,
    name: "Railways",
    icon: "https://img.icons8.com/?size=256&id=u1DomTMEHl1A&format=png",
  },
  {
    id: 4,
    name: "Electricity",
    icon: "https://img.icons8.com/?size=256&id=69682&format=png",
  },
  {
    id: 5,
    name: "Eduction",
    icon: "https://img.icons8.com/?size=256&id=12197&format=png",
  },
  {
    id: 6,
    name: "Medical",
    icon: "https://img.icons8.com/?size=256&id=EtrvEl4qafJw&format=png",
  },
];
const NewRequest = () => {
  const { user } = useContext(AuthContext);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentAddress, setCurrentAddress] = useState("");

  const [searchLocation, setSearchLocation] = useState(null);

  const [images, setImages] = useState([]);

  const upateProfile = (url) => {
    setImages((old) => [...old, url]);
  };
  const [location, setLocation] = useState(null);

  const [locationType, setLocationType] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyBUbNszKjJAkUpvdV4j-eFpr8ZWM8vIsfA`;

      const res = await fetch(api);
      const data = await res.json();

      setCurrentAddress(data?.results[0].formatted_address);
    })();
  }, []);
  const autoCompleteRef = useRef(null);

  const handleSubmit = async () => {
    if (
      title === "" ||
      content === "" ||
      department === "" ||
      locationType === null
    ) {
      alert("All fields are required");
      return;
    }
    setLoading(true);
    const { success, msg } = await addPost(
      {
        title,
        content,
        department,
        location: locationType === "current" ? currentAddress : searchLocation,
        image: images[0],
        images,
        userId: user.id,
        userName: user.name,
        profileUrl: user.profileUrl,
        date: Date.now(),
        stage: "New case",
      },
      user.id
    );
    if (success) {
      Alert.alert("Success", "Request raised successfully", [
        {
          text: "OK",
          onPress: () => {
            setImage(false);
            setImages([]);
            setTitle("");
            setContent("");
            setDepartment("");
            setLocation("");
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
    <CustomKeyboardView
      style={{
        flex: 1,
      }}
    >
      {images.length > 0 && image === true ? (
        <>
          <View
            style={{
              position: "relative",
            }}
          >
            <FlatList
              data={images}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View>
                  <Image
                    source={item}
                    style={{
                      width: widthPercentageToDP(90),
                      aspectRatio: 1.3,
                      borderRadius: 6,
                      margin: 10,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setImages((old) => old.filter((_, i) => i !== index));
                    }}
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      padding: 5,
                      borderRadius: 20,
                      backgroundColor: "white",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="#f75555"
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item}
            />

            <TouchableOpacity
              onPress={() => {
                setImage(false);
              }}
              style={{
                position: "absolute",
                bottom: 10,
                left: hp(23),
                marginTop: 10,
                borderRadius: 10,
              }}
            >
              <MaterialCommunityIcons
                name="camera-plus"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
            }}
          >
            <RNText
              style={{
                marginTop: 10,
                padding: 4,
              }}
              font={"Poppins-Medium"}
            >
              Choose the departmant under which you want to raise the request
            </RNText>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                marginVertical: 5,
                justifyContent: "center",
              }}
            >
              {departmants.map((item) => (
                <Pressable
                  key={item.id}
                  style={{
                    padding: 10,
                    backgroundColor: department === item.name ? "#111" : "#fff",
                    borderRadius: 6,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: wp(29),
                    gap: 2,
                  }}
                  onPress={() => setDepartment(item.name)}
                >
                  <Image
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 20,
                    }}
                    source={item.icon}
                    placeholder={blurhash}
                    transition={500}
                  />

                  <RNText
                    font={"Poppins-Medium"}
                    style={{
                      fontSize: 13,
                      color: department === item.name ? "#fff" : "#111",
                    }}
                  >
                    {item.name}
                  </RNText>
                </Pressable>
              ))}
            </View>
            <View
              style={{
                padding: 4,
                flex: 1,
                gap: 3,
                marginVertical: 7,
              }}
            >
              <RNText font={"Poppins-Medium"}>Post Title</RNText>
              <TextInput
                placeholder="Title"
                style={{
                  borderWidth: 2,
                  marginTop: -7,
                  borderColor: "#D1D5DB",
                  borderRadius: 5,
                  padding: 7,
                  width: "100%",
                }}
                value={title}
                onChangeText={setTitle}
              />
              <RNText font={"Poppins-Medium"}>Post Content</RNText>
              <TextInput
                style={{
                  borderWidth: 2,
                  marginTop: -7,
                  borderColor: "#D1D5DB",
                  borderRadius: 5,
                  padding: 7,
                  width: "100%",
                  height: 100,
                  textAlignVertical: "top",
                }}
                value={content}
                placeholder="Details you think are important"
                onChangeText={setContent}
                multiline={true}
                numberOfLines={3}
              />
            </View>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <View style={styles.container}>
                {locationType === null && (
                  <>
                    {/* <MapView
                    region={{
                      latitude: location
                        ? location.coords.latitude
                        : 37.4219983,
                      longitude: location
                        ? location.coords.longitude
                        : -122.084,
                      latitudeDelta: 0.001,
                      longitudeDelta: 0.002,
                    }}
                    style={styles.map}
                    showsUserLocation
                    showsMyLocationButton
                  /> */}

                    <RNText
                      font={"Poppins-Medium"}
                      style={{
                        marginVertical: 10,
                        textAlign: "center",
                      }}
                    >
                      {currentAddress}
                    </RNText>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <Pressable
                        onPress={() => setLocationType("current")}
                        style={{
                          backgroundColor: Colors.primary,
                          borderRadius: 4,
                          paddingHorizontal: 20,
                          fontSize: 14,
                        }}
                      >
                        <RNText
                          style={{
                            color: "white",
                            fontSize: 12.25,
                            lineHeight: 17.5,
                            textAlign: "center",
                            padding: 7,
                          }}
                          font={"Poppins-Bold"}
                        >
                          Use Current Location
                        </RNText>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setLocationType("search");
                          setSearchLocation(null);
                        }}
                        style={{
                          backgroundColor: Colors.primary,
                          borderRadius: 4,
                          paddingHorizontal: 20,
                          fontSize: 14,
                        }}
                      >
                        <RNText
                          style={{
                            color: "white",
                            fontSize: 12.25,
                            lineHeight: 17.5,
                            textAlign: "center",
                            padding: 7,
                          }}
                          font={"Poppins-Bold"}
                        >
                          Search Location
                        </RNText>
                      </Pressable>
                    </View>
                  </>
                )}
                {locationType === "search" && !searchLocation && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: wp(94),
                    }}
                  >
                    <GooglePlacesAutocomplete
                      ref={autoCompleteRef}
                      placeholder="Search location"
                      nearbyPlacesAPI="GooglePlacesSearch"
                      debounce={400}
                      fetchDetails={true}
                      listEmptyComponent={
                        <View style={{ flex: 1 }}>
                          <RNText
                            font={"Poppins-Medium"}
                            style={{
                              textAlign: "center",
                            }}
                          >
                            No results were found
                          </RNText>
                        </View>
                      }
                      enablePoweredByContainer={false}
                      styles={{
                        textInput: {
                          paddingLeft: 16,
                          backgroundColor: "transparent",
                          fontFamily: "Poppins-Medium",
                          fontSize: 15,
                          height: "100%",
                          borderRadius: 5,
                          paddingVertical: 4,
                          paddingHorizontal: 8,
                          borderWidth: 1,
                          borderColor: Colors.mediumGray,
                          flex: 1,
                        },
                        listView: {
                          backgroundColor: "white",
                          width: wp(94),
                          zIndex: 1000,
                        },
                      }}
                      onPress={(data) => {
                        console.log(data.description);
                        setSearchLocation(data.description);
                      }}
                      query={{
                        key: "AIzaSyBLUR_dBTa9l4s-UYSpdVUJOJR3FFv2_6E",
                        language: "en",
                      }}
                    />
                    <AntDesign
                      name="closecircleo"
                      size={16}
                      color={Colors.mediumGray}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: 12.5,
                        zIndex: 1000,
                      }}
                      onPress={() => {
                        autoCompleteRef.current.clear();
                        setSearchLocation(null);
                        setLocationType(null);
                      }}
                    />
                  </View>
                )}
              </View>
            </View>

            {locationType === "search" && searchLocation !== null && (
              <>
                <View>
                  <RNText
                    style={{
                      padding: 7,
                      borderRadius: 5,
                    }}
                  >
                    Location:{" "}
                    <RNText
                      style={{
                        color: "#111",
                        textAlign: "center",
                        padding: 7,
                      }}
                      font={"Poppins-Bold"}
                    >
                      {searchLocation}
                    </RNText>
                  </RNText>
                  <TouchableOpacity
                    onPress={() => {
                      setLocationType(null);
                    }}
                  >
                    <RNText
                      font={"Poppins-Bold"}
                      style={{
                        textDecorationLine: "underline",
                        color: "#3B82F6",
                        fontSize: 10.5,
                        lineHeight: 14,
                        textAlign: "center",
                        padding: 7,
                      }}
                    >
                      (change)
                    </RNText>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  {loading ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Loading size={hp(6.5)} />
                    </View>
                  ) : (
                    <Pressable
                      onPress={handleSubmit}
                      style={{
                        backgroundColor: "#222831",
                        borderRadius: 6,
                        paddingHorizontal: 20,
                        fontSize: 14,
                      }}
                    >
                      <RNText
                        style={{
                          color: "white",
                          fontSize: 12.25,
                          lineHeight: 17.5,
                          textAlign: "center",
                          padding: 7,
                        }}
                        font={"Poppins-Bold"}
                      >
                        Submit Complaint
                      </RNText>
                    </Pressable>
                  )}
                </View>
              </>
            )}
            {locationType === "current" && currentAddress !== null && (
              <>
                <View>
                  <RNText
                    style={{
                      padding: 7,
                      borderRadius: 5,
                    }}
                  >
                    Location:{" "}
                    <RNText
                      style={{
                        color: "#111",
                        textAlign: "center",
                        padding: 7,
                      }}
                      font={"Poppins-Bold"}
                    >
                      {currentAddress}
                    </RNText>
                  </RNText>
                  <TouchableOpacity
                    onPress={() => {
                      setLocationType(null);
                    }}
                  >
                    <RNText
                      font={"Poppins-Bold"}
                      style={{
                        textDecorationLine: "underline",
                        color: "#3B82F6",
                        fontSize: 10.5,
                        lineHeight: 14,
                        textAlign: "center",
                        padding: 7,
                      }}
                    >
                      (change)
                    </RNText>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  {loading ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Loading size={hp(6.5)} />
                    </View>
                  ) : (
                    <Pressable
                      onPress={handleSubmit}
                      style={{
                        backgroundColor: "#222831",
                        borderRadius: 6,
                        paddingHorizontal: 20,
                        fontSize: 14,
                      }}
                    >
                      <RNText
                        style={{
                          color: "white",
                          fontSize: 12.25,
                          lineHeight: 17.5,
                          textAlign: "center",
                          padding: 7,
                        }}
                        font={"Poppins-Bold"}
                      >
                        Submit Complaint
                      </RNText>
                    </Pressable>
                  )}
                </View>
              </>
            )}
            <Pressable
              onPress={() => {
                setImage(false);
                setImages([]);
                setTitle("");
                setContent("");
                setDepartment("");
                setLocation("");
                router.navigate("/home");
              }}
              style={{
                backgroundColor: "#f75555",
                borderRadius: 6,
                paddingHorizontal: 20,
                fontSize: 14,
              }}
            >
              <RNText
                style={{
                  color: "white",
                  fontSize: 12.25,
                  lineHeight: 17.5,
                  textAlign: "center",
                  padding: 7,
                }}
                font={"Poppins-Bold"}
              >
                Cancel Complaint
              </RNText>
            </Pressable>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {images.length > 0 ? (
            <>
              <FlatList
                data={images}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View>
                    <Image
                      source={item}
                      style={{
                        width: widthPercentageToDP(80),
                        aspectRatio: 1.3,
                        borderRadius: 6,
                        margin: 10,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setImages((old) => old.filter((_, i) => i !== index));
                      }}
                      style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        padding: 5,
                        borderRadius: 20,
                        backgroundColor: "white",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color="#f75555"
                      />
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item}
              />

              <Pressable
                onPress={() => {
                  setImage(true);
                }}
                style={{
                  backgroundColor: "#222831",
                  borderRadius: 6,
                  paddingHorizontal: 20,
                  fontSize: 14,
                }}
              >
                <RNText
                  style={{
                    color: "white",
                    fontSize: 12.25,
                    lineHeight: 17.5,
                    textAlign: "center",
                    padding: 7,
                  }}
                  font={"Poppins-Bold"}
                >
                  Create Complaint
                </RNText>
              </Pressable>
            </>
          ) : (
            <SvgFromXml
              xml={post}
              width={widthPercentageToDP(90)}
              height={400}
              style={{
                marginLeft: 10,
              }}
            />
          )}

          <AddStory id={user.id} upateProfile={upateProfile} />
        </View>
      )}
    </CustomKeyboardView>
  );
};

export default NewRequest;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: wp(100),
    height: hp(30),
  },
});
export const INITIAL_REGION = {
  latitude: 37.4219983,
  longitude: -122.084,
  latitudeDelta: 0.001,
  longitudeDelta: 0.002,
};
