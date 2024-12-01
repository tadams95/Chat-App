import {
  StyleSheet,
  Image,
  Platform,
  View,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import homeImage from "../../assets/images/home-image.jpg";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HomeScreen() {
  return (
    <View style={styles.mainWrapper}>
      <ImageBackground source={homeImage} style={styles.homeImage} />
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
});
