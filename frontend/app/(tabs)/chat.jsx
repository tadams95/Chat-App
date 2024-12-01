import { useContext, useEffect } from "react";
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

import { GlobalContext } from "@/context";

import { AntDesign } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import ChatComponent from "@/components/ChatComponent";
import NewGroupModal from "../../components/Modal";
import { useNavigation } from "@react-navigation/native";
import socket from "@/utils";

export default function Chat() {
  const {
    currentUser,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
    setCurrentUser,
    setShowLoginView,
  } = useContext(GlobalContext);

  const navigation = useNavigation();

  useEffect(() => {
    socket.emit("getAllGroups");

    socket.on("groupList", (groups) => {
      console.log(groups);
      setAllChatRooms(groups);
    });

    // Listen for new chat room event
    socket.on("newGroup", (newGroup) => {
      setAllChatRooms((prevChatRooms) => [...prevChatRooms, newGroup]);
    });

    return () => {
      socket.off("groupList");
      socket.off("newGroup");
    };
  }, [socket]);
  function handleLogout() {
    setCurrentUser("");
    setShowLoginView(false);
  }

  useEffect(() => {
    if (currentUser.trim() !== "") navigation.navigate("chat");
  }, [currentUser]);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.heading}>
          <ThemedText style={styles.text}>Welcome, {currentUser}</ThemedText>
          <Pressable style={{ paddingTop: 30 }}>
            <AntDesign name="logout" size={24} color="white" />
          </Pressable>
        </View>
      </View>
      <View style={styles.listContainer}>
        {allChatRooms && allChatRooms.length > 0 ? (
          <FlatList
            data={allChatRooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Create New Group</Text>
          </View>
        </Pressable>
      </View>
      {modalVisible && <NewGroupModal />}
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
    height: "90",
    padding: width * 0.05,
    backgroundColor: "green",
    alignItems: "center",
    marginBottom: height * 0.075,
  },
  button: {
    backgroundColor: "#4527A0",
    padding: width * 0.025,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
