import { signOut } from "firebase/auth";

import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../firebase/firebaseConfig";

import { useDispatch } from "react-redux";

import type { AppDispatch } from "../redux/store";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { styles } from "../styles/AuthStyles";

const backgroundImage = require("../assets/images/background.jpg");

type Props = {
  navigation: any;
};

export default function HomeScreen({
  navigation,
}: Props) {

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async (): Promise<void> => {

    try {

      // Firebase logout
      await signOut(auth);

      // Google logout
      await GoogleSignin.signOut();

      dispatch({ type: "LOGOUT" });

      console.log("LOGOUT SUCCESS");

    } catch (error: unknown) {

      console.log("LOGOUT FAILED", error);
    }
  };

  return (

    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
      blurRadius={3}
    >

      <View style={styles.overlay}>

        <View style={styles.container}>

          <Text style={styles.title}>
            Welcome!
          </Text>

          <Text style={styles.subtitle}>
            You successfully logged in.
          </Text>

          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >

            <Text style={styles.buttonText}>
              Logout
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </ImageBackground>
  );
}