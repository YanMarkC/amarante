
import {
  signInWithEmailAndPassword,
  UserCredential,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { 
  useState, 
  useEffect 
} from "react";

import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

import CustomTextInput from "../components/CustomTextInput";

import { auth } from "../firebase/firebaseConfig";

import { styles } from "../styles/AuthStyles";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const backgroundImage = require("../assets/images/background.jpg");


type Props = {
  navigation: any;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

useEffect(() => {
  GoogleSignin.configure({
    webClientId:
      "664295491127-lr8fq0e8tl1hbt8b9rro2gsgqbuvclld.apps.googleusercontent.com",
  });
}, []);


  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      console.log("LOGIN REQUEST");

      const userCredential: UserCredential =
        await signInWithEmailAndPassword(auth, email, password);

      console.log("LOGIN SUCCESS", userCredential.user);
    } catch (error: unknown) {
      console.log("LOGIN FAILED", error);

      Alert.alert("Login Failed", "Invalid credentials");
    }
  };

const handleGoogleLogin = async (): Promise<void> => {
  try {
    // Check Google Play Services
    await GoogleSignin.hasPlayServices();

    // Start sign in
    const userInfo = await GoogleSignin.signIn();

    // Get ID token
    const idToken = userInfo.data?.idToken;

    if (!idToken) {
      Alert.alert("Google Sign In Failed", "No ID token found");
      return;
    }

    // Create Firebase credential
    const googleCredential =
      GoogleAuthProvider.credential(idToken);

    // Sign in to Firebase
    const userCredential = await signInWithCredential(
      auth,
      googleCredential
    );

    console.log(
      "GOOGLE LOGIN SUCCESS",
      userCredential.user
    );

  } catch (error: any) {
    console.log("GOOGLE LOGIN ERROR", error);

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert("Cancelled", "Google sign in cancelled");
    } else if (
      error.code === statusCodes.IN_PROGRESS
    ) {
      Alert.alert("Loading", "Sign in already in progress");
    } else if (
      error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
    ) {
      Alert.alert(
        "Error",
        "Google Play Services not available"
      );
    } else {
      Alert.alert("Error", "Google Sign In Failed");
    }
  }
};



  return (
  <ImageBackground
    source={backgroundImage}
    style={styles.background}
    resizeMode="cover"
    blurRadius={3}
  >
    {/* Dark overlay */}
    <View style={styles.overlay}>

      <View style={styles.container}>
        <Text style={styles.title}>Daybreak</Text>

        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />

        <CustomTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.normalText}>
          Don't have an account?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.normalText}>or</Text>

        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={styles.googleButton}
        >
          <Text style={styles.buttonText}>
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  </ImageBackground>
);
}

