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
import { SvgXml } from "react-native-svg";
import loginImg from "../../assets/svg/login";
import Loading from "../../components/Loading";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeybordView";
import RNText from "../../components/RNText";
const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState(true);

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Sign In", "Email and Password are required");
      return;
    }

    setLoading(true);

    let response = await login(email, password);

    setLoading(false);
    if (!response.success) {
      Alert.alert("SignIn", response.msg);
    }

    // Implement your sign-in logic here
  };

  return (
    <CustomKeyboardView>
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
          gap: 8,
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 14,
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
            marginBottom: -3.5,
          }}
          font={"Poppins-Bold"}
        >
          Log In
        </RNText>
        <View
          style={{
            flex: 1,
            gap: 4,
          }}
        >
          <RNText>Email</RNText>
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
          <RNText>Password</RNText>

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
                right: 5,
                top: 2,
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
                <Loading size={hp(6.5)} />
              </View>
            ) : (
              <Pressable
                onPress={handleSignIn}
                style={{ backgroundColor: "#3B82F6", borderRadius: 999 }}
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
                  Log In
                </RNText>
              </Pressable>
            )}
          </View>

          <Pressable
            onPress={() => {
              router.replace("/signup");
            }}
            style={{
              backgroundColor: "#222831",
              borderRadius: 999,
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
              Sign Up
            </RNText>
          </Pressable>
          <Pressable
            onPress={() => {
              router.replace("/forgotpassword");
            }}
          >
            <RNText
              style={{
                textAlign: "center",
                marginVertical: 7,
              }}
              font={"Poppins-Medium"}
            >
              Forgot your password?
            </RNText>
          </Pressable>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignIn;
