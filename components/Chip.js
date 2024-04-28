// export default Timeline;
import React from "react";
import { View, StyleSheet } from "react-native";
import RNText from "./RNText";

const Chip = ({ stage }) => {
  let chipColor;
  switch (stage) {
    case NEW_CASE:
      //pnik flavor color
      chipColor = "#2196F3";
      break;
    case CONFIRMED:
      chipColor = "#FF9800";
      break;
    case COMPLETED:
      chipColor = "#4aaf57";
      break;
    case REJECTED:
      chipColor = "#FF2E63";
      break;
    case WORK_IN_PROGRESS:
      chipColor = "#8E3fff";
      break;
    case READY_FOR_COMPLETION:
      chipColor = "#111";
      break;
    default:
      chipColor = "#9E9E9E";
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: chipColor,
        },
      ]}
    >
      <RNText style={styles.text}>{stage}</RNText>
    </View>
  );
};

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

export default Chip;

//create constants for the stages
export const NEW_CASE = "New case";
export const CONFIRMED = "Confirmed";
export const COMPLETED = "Completed";
export const REJECTED = "Rejected";
export const WORK_IN_PROGRESS = "Work in progress";
export const READY_FOR_COMPLETION = "Ready for Completion";
