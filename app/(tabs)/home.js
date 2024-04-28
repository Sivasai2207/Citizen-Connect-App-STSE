import {
  View,
  Pressable,
  FlatList,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import RNText from "../../components/RNText";
import Story from "../../components/Story";
import PostList from "../../components/PostsList";
import { NEW_CASE, REJECTED } from "../../components/Chip";

const Home = () => {
  const { posts, last24H } = useContext(AuthContext);
  return (
    <>
      <Image
        source={require("../../assets/app/logo.png")}
        style={{
          width: 50,
          height: 50,
          alignSelf: "center",
          marginTop: 20,
          position: "absolute",
          zIndex: 100,
          left: 30,
          top: -75,
        }}
      />
      <ScrollView
        style={
          {
            // paddingTop: ios ? top : top + 10,
          }
        }
      >
        {last24H.length > 0 && (
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
              paddingBottom: 2,
              justifyContent: "center",
            }}
          >
            <FlatList
              data={last24H}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <Story item={item} />}
              keyExtractor={(item) => item.date}
            />
          </View>
        )}

        <PostList
          data={posts.filter(
            (post) => post.stage !== NEW_CASE && post.stage !== REJECTED
          )}
        />
      </ScrollView>
    </>
  );
};
export default Home;
