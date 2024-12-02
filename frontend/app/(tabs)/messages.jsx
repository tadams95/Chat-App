import { useContext, useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Dimensions,
} from "react-native";
import { GlobalContext } from "@/context";
import MessageComponent from "@/components/MessageComponent";
import socket from "@/utils";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Messages({ navigation, route }) {
  const { currentGroupName, currentGroupID } = useLocalSearchParams();
  const {
    allChatMessages,
    setAllChatMessages,
    currentUser,
    currentChatMessage,
    setCurrentChatMessage,
  } = useContext(GlobalContext);

  useEffect(() => {
    socket.emit("findGroup", currentGroupID);
    socket.on("foundGroup", (allChats) => setAllChatMessages(allChats));

    return () => {
      socket.off("foundGroup");
    };
  }, [socket, currentGroupID]);

  function handleAddNewMessage() {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };
    // Add your message handling logic here
    if (currentUser) {
      socket.emit("newChatMessage", {
        currentChatMessage,
        groupIdentifier: currentGroupID,
        currentUser,
        timeData,
      });

      setCurrentChatMessage("");
      Keyboard.dismiss();
    }
  }

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.heading}>
          <ThemedText style={styles.text}>Chat</ThemedText>
          <Pressable style={{ paddingTop: 30 }}></Pressable>
        </View>
      </View>
      <View style={styles.listContainer}>
        {/* {allChatRooms && allChatRooms.length > 0 ? (
          <FlatList
            data={allChatRooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null} */}
        <ThemedText>Messages will show here</ThemedText>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentChatMessage}
          onChangeText={(value) => setCurrentChatMessage(value)}
          placeholder="Enter your message"
        />
        <Pressable onPress={handleAddNewMessage} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Send</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  topContainer: {
    width: "100%",
    padding: width * 0.05,
    backgroundColor: "#4527A0",
    alignItems: "center",
    height: height * 0.1,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: width * 0.05,
    fontWeight: "bold",
    paddingTop: height * 0.03,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    padding: width * 0.025,
    backgroundColor: "white",
  },
  bottomContainer: {
    width: "100%",
    paddingBottom: 30,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "green",
    marginBottom: height * 0.075,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    width: "30%",
    backgroundColor: "#4527A0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
