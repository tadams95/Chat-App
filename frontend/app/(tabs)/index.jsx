import {
  StyleSheet,
  Image,
  Platform,
  View,
  ImageBackground,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import homeImage from "../../assets/images/home-image.jpg";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useContext } from "react";
import { GlobalContext } from "@/context/index";

export default function HomeScreen() {
  const { showLoginView, setShowLoginView } = useContext(GlobalContext);
  const { currentUserName, setCurrentUserName } = useContext(GlobalContext);

  return (
    <View style={styles.mainWrapper}>
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
                value="currentUserName"
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable style={styles.button}>
                <View>
                  <ThemedText style={styles.buttonText}>Register</ThemedText>
                </View>
              </Pressable>
              <Pressable style={styles.button}>
                <View>
                  <ThemedText style={styles.buttonText}>Login</ThemedText>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.infoBlock}>
            <ThemedText style={styles.buttonText}>
              Connect, Grow and Inspire
            </ThemedText>
            <ThemedText style={styles.buttonText}>
              Connect people around the world for free
            </ThemedText>
            <Pressable
              style={styles.button}
              onPress={() => setShowLoginView(true)}
            >
              <View>
                <ThemedText>Get Started</ThemedText>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
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
  },
});
