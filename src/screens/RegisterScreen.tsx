

import {
  createUserWithEmailAndPassword,
  UserCredential,
  AuthError,
} from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase/firebaseConfig";


type Props = {
  navigation: any;
};

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (): Promise<void> => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      console.log("REGISTER SUCCESS", userCredential.user);

      Alert.alert("Account Created");

      navigation.navigate("Login");
    } catch (error: unknown) {
      const err = error as AuthError;

      console.log("REGISTER FAILED", err.code);

      if (err.code === "auth/email-already-in-use") {
        Alert.alert("Register Failed", "Email already in use");
      } else if (err.code === "auth/invalid-email") {
        Alert.alert("Register Failed", "Invalid email format");
      } else if (err.code === "auth/weak-password") {
        Alert.alert(
          "Register Failed",
          "Password must be at least 6 characters"
        );
      } else {
        Alert.alert("Register Failed", err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="User Name"
        value={name}
        onChangeText={(text: string) => setName(text)}
        style={styles.input}
      />

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

      <TouchableOpacity
        onPress={handleRegister}
        style={styles.registerButton}
      >
        <Text style={styles.buttonText}>Register</Text>
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

  registerButton: {
    backgroundColor: "#43a047",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});