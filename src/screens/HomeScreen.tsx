

import { signOut } from "firebase/auth";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";


type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);

      dispatch({ type: "LOGOUT" });

      console.log("LOGOUT SUCCESS");
    } catch (error: unknown) {
      console.log("LOGOUT FAILED", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <Text style={styles.subtitle}>
        You successfully logged in.
      </Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a237e",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
  },

  logoutButton: {
    backgroundColor: "#e53935",
    padding: 14,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});