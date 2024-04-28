import React from "react";
import { View, StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import RNText from "./RNText";
import Colors from "../constants/Colors";

const VerticalTimeline = ({ currentState, states }) => {
  return (
    <>
      {/* <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {states.map((state, index) => (
          <RNText
            style={{
              fontSize: 10,
              color:
                currentState?.id === index ? Colors.green : Colors.mediumGray,
              width: 60,
            }}
            font={"Poppins-Bold"}
          >
            {state.name}
          </RNText>
        ))}
      </View> */}
      <View style={styles.container}>
        {states.map((state, index) => (
          <View key={index} style={styles.timelineItem}>
            <View
              style={[
                styles.state,
                index <= currentState?.id
                  ? {
                      backgroundColor: "#111",
                    }
                  : styles.remainingState,
                index === currentState?.id && {
                  borderWidth: 2,
                  borderColor: "#111",
                  transform: [{ scale: 1.3 }], //change the size of the circle
                  zIndex: 10,
                },
              ]}
            ></View>
          </View>
        ))}

        <View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: "#d8d8d8",
            position: "absolute",
            zIndex: -1,
          }}
        >
          <View
            style={{
              height: 2,
              width: `${(100 / (states.length - 1)) * currentState.id}%`,
              backgroundColor: "#111",
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    gap: 40,
  },
  timelineItem: {
    flexDirection: "row",
    position: "relative",
  },
  state: {
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  completedState: {
    backgroundColor: Colors.green,
  },
  remainingState: {
    backgroundColor: "lightgray",
  },
});

export default VerticalTimeline;
