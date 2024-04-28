import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../../components/Loading";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeybordView";
import RNText from "../../components/RNText";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState(true);

  const handleSignIn = async () => {
    if (email === "" || password === "" || name === "") {
      Alert.alert("SignUp", "All fields are required");
      return;
    }

    setLoading(true);

    let response = await register(email, password, name);

    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View
        style={{
          paddingTop: hp(6),
          paddingHorizontal: wp(5),
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 6 * 3.5,
          }}
        >
          <Image source={require("../../assets/app/logo.png")} />
          <RNText
            style={{
              fontSize: 31.5,
              lineHeight: 35,
              textAlign: "center",
            }}
            font={"Poppins-Bold"}
          >
            CitizenConnect
          </RNText>
          <RNText
            style={{
              fontSize: 12.25,
              lineHeight: 17.5,
              textAlign: "center",
            }}
          >
            From click to Resolution, Transforming cities
          </RNText>
        </View>

        <RNText
          style={{
            fontSize: 26.25,
            lineHeight: 31.5,
            textAlign: "center",
          }}
          font={"Poppins-Bold"}
        >
          Sign Up
        </RNText>
        <View
          style={{
            flex: 1,
            gap: 4,
          }}
        >
          <RNText font="Poppins-Bold">Name</RNText>
          <TextInput
            placeholder="Name"
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
          <RNText font="Poppins-Bold">Email</RNText>
          <TextInput
            placeholder="test@test.com"
            style={{
              borderWidth: 2,
              marginTop: -7,
              borderColor: "#D1D5DB",
              borderRadius: 5,
              padding: 7,
              width: "100%",
            }}
            value={email}
            onChangeText={setEmail}
          />
          <RNText font="Poppins-Bold">Password</RNText>

          <View
            style={{
              position: "relative",
            }}
          >
            <TextInput
              placeholder="*********"
              secureTextEntry={hidePassword ? true : false}
              style={{
                borderWidth: 2,
                marginTop: -7,
                borderColor: "#D1D5DB",
                borderRadius: 5,
                padding: 7,
                width: "100%",
              }}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
              style={{
                position: "absolute",
                right: 10,
                top: 5,
                zIndex: 10,
              }}
            >
              {hidePassword ? (
                <AntDesign name="eye" size={20} color="black" />
              ) : (
                <FontAwesome name="eye-slash" size={20} color="black" />
              )}
            </Pressable>
          </View>
          <View
            style={{
              paddingHorizontal: 3.5,
            }}
          >
            <BouncyCheckbox
              size={22}
              unfillColor="#ddd"
              fillColor="#3B82F6"
              text="I would like to receive your newsletter and other promotional information."
              innerIconStyle={{ borderWidth: 1.5, borderColor: "transparent" }}
              textStyle={{
                fontFamily: "Poppins-Regular",
                textDecorationLine: "none",
                fontSize: hp(1.8),
              }}
              iconStyle={{
                borderRadius: 5,
                borderColor: "#bbb",
              }}
            />
          </View>
          <View>
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
                style={{ backgroundColor: "#3B82F6", borderRadius: 999 }}
                onPress={handleSignIn}
              >
                <RNText
                  style={{
                    fontSize: hp(2.2),
                    color: "#fff",
                    textAlign: "center",
                    padding: 7,
                    borderRadius: 5,
                  }}
                  font={"Poppins-Bold"}
                >
                  Sign Up
                </RNText>
              </Pressable>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RNText style={{ color: "#6B7280" }}>
              Already have an account?{" "}
            </RNText>
            <TouchableOpacity
              onPress={() => {
                router.replace("/signin");
              }}
            >
              <RNText style={{ color: "#3B82F6" }} font={"Poppins-Bold"}>
                Sign In
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignUp;
