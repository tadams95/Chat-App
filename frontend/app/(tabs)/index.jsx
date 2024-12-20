import React, { useContext, useEffect } from "react";
import {
  View,
  ImageBackground,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { GlobalContext } from "@/context/index";
import homeImage from "../../assets/images/home-image.jpg";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
  } = useContext(GlobalContext);

  const navigation = useNavigation();

  function handleRegisterAndSignIn(isLogin) {
    if (currentUserName.trim() !== "") {
      const index = allUsers.findIndex(
        (userItem) => userItem === currentUserName
      );

      if (isLogin) {
        if (index === -1) {
          Alert.alert("Please register first");
        } else {
          setCurrentUser(currentUserName);
        }
      } else {
        if (index === -1) {
          allUsers.push(currentUserName);
          setAllUsers(allUsers);
          setCurrentUser(currentUserName);
        } else {
          Alert.alert("Already registered ! Please login");
        }
      }

      setCurrentUserName("");
    } else {
      Alert.alert("User name field is empty");
    }

    Keyboard.dismiss();
  }

  useEffect(() => {
    if (currentUser.trim() !== "") navigation.navigate("chat");
  }, [currentUser]);

  return (
    <KeyboardAvoidingView
      style={styles.mainWrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground source={homeImage} style={styles.homeImage} />
      <View style={styles.content}>
        {showLoginView ? (
          <View style={styles.infoBlock}>
            <View style={styles.loginInputContainer}>
              <ThemedText style={styles.heading}>
                Enter your User Name
              </ThemedText>
              <TextInput
                autoCorrect={false}
                placeholder="Enter your User Name"
                style={styles.loginInput}
                onChangeText={(value) => setCurrentUserName(value)}
                value={currentUserName}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={() => handleRegisterAndSignIn(false)}
                style={styles.button}
              >
                <View>
                  <ThemedText style={styles.buttonText}>Register</ThemedText>
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleRegisterAndSignIn(true)}
                style={styles.button}
              >
                <View>
                  <ThemedText style={styles.buttonText}>Login</ThemedText>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.infoBlock}>
            <ThemedText style={styles.tagline}>
              Connect, Grow and Inspire
            </ThemedText>
            <ThemedText style={styles.subTagline}>
              Connect people around the world for free
            </ThemedText>
            <Pressable
              style={styles.button}
              onPress={() => setShowLoginView(true)}
            >
              <View>
                <ThemedText style={styles.buttonText}>Get Started</ThemedText>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginBottom: 50,
  },
  homeImage: {
    width: "100%",
    flex: 2,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  infoBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  loginInputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  loginInput: {
    width: "100%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "#4527A0",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  tagline: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subTagline: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
});
