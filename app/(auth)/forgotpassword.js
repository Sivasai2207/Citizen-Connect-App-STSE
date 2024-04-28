import React, { useContext, useState } from "react";
import { View, TextInput, Button, Alert, Pressable, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import loginImg from "../../assets/svg/login";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import RNText from "../../components/RNText";
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  const router = useRouter();
  const handleResetPassword = async () => {
    // check for email validation
    if (
      email === "" ||
      !email.includes("@") ||
      !email.includes(".") ||
      email.length < 5
    ) {
      Alert.alert("Reset Password", "Please enter a valid email address");
      return;
    }
    setLoading(true);
    const status = await resetPassword(email);
    setLoading(false);

    if (status.success) {
      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email to reset your password.",
        [
          {
            text: "Go to Sign In",
            onPress: () => router.replace("/signin"),
          },
        ]
      );
    } else {
      Alert.alert("Reset Password", status.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
          flex: 1,
          gap: 4,
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
            marginBottom: 3 * 3.5,
          }}
          font={"Poppins-Bold"}
        >
          Forgot Password
        </RNText>
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
        <RNText font={"Poppins-Medium"}>
          Note: Please enter your registered email address. You will receive a
          link to create a new password via email.
        </RNText>
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
            <>
              <Pressable
                style={{ backgroundColor: "#3B82F6", borderRadius: 5 }}
                onPress={handleResetPassword}
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
                  Reset
                </RNText>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#222831",
                  borderRadius: 5,
                  marginTop: 7,
                }}
                onPress={() => {
                  router.replace("/signin");
                }}
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
                  Back
                </RNText>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
