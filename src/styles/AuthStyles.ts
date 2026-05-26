import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  // ---------------- Background ----------------

  background: {
    flex: 1,
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
  },

  // ---------------- Container ----------------

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    width: "100%",
  },

  // ---------------- Text ----------------

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#ffffff",
  },

  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
  },

  normalText: {
    color: "#ffffff",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
  },

  linkText: {
    color: "#90caf9",
    fontSize: 16,
    fontWeight: "600",
  },

  // ---------------- Inputs ----------------

  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  // ---------------- Buttons ----------------

  loginButton: {
    backgroundColor: "#1976d2",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  registerButton: {
    backgroundColor: "#199935",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  googleButton: {
  backgroundColor: "#c5c5c5",
  width: "100%",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  marginBottom: 15,
  },

  logoutButton: {
    backgroundColor: "#c83939",
    padding: 15,
    borderRadius: 12,
    width: "70%",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },

  googleIcon: {
  marginRight: 10,
  },

});