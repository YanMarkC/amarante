
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
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase/firebaseConfig";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";




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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text>Don't have an account?</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Sign Up</Text>
      </TouchableOpacity>

      <Text>or</Text>


      {/* ----------------Google sign in button---------------- */}



      <TouchableOpacity
        onPress={handleGoogleLogin}
        style={styles.googleButton}
      >
        <Text style={styles.buttonText}>
          Continue with Google
        </Text>
      </TouchableOpacity>

    </View>
  );

  
}

// Styles-------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8f0fe",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1a237e",
  },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    
  },

  loginButton: {
    backgroundColor: "#1976d2",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  linkText: {
    color: "#1976d2",
    fontSize: 16,
  },

  googleButton: {
  backgroundColor: "#db4437",
  width: "100%",
  padding: 15,
  borderRadius: 8,
  alignItems: "center",
  marginBottom: 15,
},
});