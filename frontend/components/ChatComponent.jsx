import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import { useNavigation } from "@react-navigation/native";

export default function Chatcomponent({ item }) {
  const navigation = useNavigation();
  const [currentItem, setCurrentItem] = useState(item);

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  console.log("Chat component item: ", item);

  function handleNavigateToMessageScreen() {
    navigation.navigate("messages", {
      currentGroupName: item.groupName,
      currentGroupID: item.id,
    });
  }

  return (
    <Pressable style={styles.chat} onPress={handleNavigateToMessageScreen}>
      <View style={styles.circle}>
        <FontAwesome name="group" size={24} color={"black"} />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{currentItem.groupName}</Text>
          <Text style={styles.message}>
            {currentItem && currentItem.messages && currentItem.messages.length
              ? currentItem.messages[currentItem.messages.length - 1].text
              : "Tap to start messaging"}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {currentItem && currentItem.messages && currentItem.messages.length
              ? currentItem.messages[currentItem.messages.length - 1].time
              : "Now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
    height: 90,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userName: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "600",
  },
  message: {
    fontSize: 16,
    opacity: 0.8,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  time: {
    fontSize: 12,
    opacity: 0.7,
    color: "#888",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 15,
  },
});
