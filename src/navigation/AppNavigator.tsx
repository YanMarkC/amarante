
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

type RootState = {
  auth: {
    user: User | null;
  };
};

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      dispatch({
        type: "SET_USER",
        payload: currentUser,
      });

      setLoading(false);
      console.log("Auth state:", currentUser);
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading) return null;

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}