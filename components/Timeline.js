import React from "react";
import { View, StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import RNText from "./RNText";
import Colors from "../constants/Colors";

const Timeline = ({ currentState, states }) => {
  const { id: currentStateId } = states.find(
    (state, index) => state.name === currentState
  );
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {states.map((state, index) => (
          <RNText
            key={index}
            style={{
              fontSize: 10,
              color:
                currentStateId === index ? Colors.green : Colors.mediumGray,
              width: 60,
            }}
            font={"Poppins-Bold"}
          >
            {state.name}
          </RNText>
        ))}
      </View>
      <View style={styles.container}>
        {states.map((state, index) => (
          <View key={index} style={styles.timelineItem}>
            <View
              style={[
                styles.state,
                index <= currentStateId
                  ? {
                      backgroundColor: "#43c88e",
                    }
                  : styles.remainingState,
                index === currentStateId && {
                  borderWidth: 2,
                  borderColor: "#43c88e",
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
              width: `${(100 / (states.length - 1)) * currentStateId}%`,
              backgroundColor: "#43c88e",
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
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

export default Timeline;
