This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

----------------------------------------------------------------------------------

App.js

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

----------------------------------------------------------------------------------

firebase/firebaseConfig.js


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYh-vpFI3M4J3DvyqTNUenihEAu73GkNo",
  authDomain: "react-native-auth-app-bad6e.firebaseapp.com",
  projectId: "react-native-auth-app-bad6e",
  storageBucket: "react-native-auth-app-bad6e.firebasestorage.app",
  messagingSenderId: "664295491127",
  appId: "1:664295491127:web:a4b758e9ab606dfa5221b2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

----------------------------------------------------------------------------------

navigation/AppNavigator.js

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

    dispatch({
      type: "SET_USER",
      payload: currentUser,
    });

    setLoading(false);
    console.log("Auth state:", currentUser);
  });

  return unsubscribe;
}, []);

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

----------------------------------------------------------------------------------

redux/reducers/authReducer.js



const initialState = {
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

----------------------------------------------------------------------------------

redux/actions/authAactions.js


export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

----------------------------------------------------------------------------------

redux/store.js

import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer);

----------------------------------------------------------------------------------

screens/HomeScreen.js

import { signOut } from "firebase/auth";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";

export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      dispatch({ type: "LOGOUT" });

      console.log("LOGOUT SUCCESS");
    } catch (error) {
      console.log("LOGOUT FAILED", error);
    }
  };

  return (

<View style={styles.container}>

<Text style={styles.title}>Welcome!</Text>

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

  );
}

// Styles-------------------------------------------------------------------------------------------------------

const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"#e8f0fe",
padding:20
},

title:{
fontSize:32,
fontWeight:"bold",
color:"#1a237e"
},

subtitle:{
fontSize:16,
marginTop:10,
marginBottom:30
},

logoutButton:{
backgroundColor:"#e53935",
padding:14,
borderRadius:8,
width:"60%",
alignItems:"center"
},

buttonText:{
color:"#fff",
fontWeight:"bold",
fontSize:16
}

})

----------------------------------------------------------------------------------

screns/LoginScreen.js

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase/firebaseConfig";

export default function LoginScreen({ navigation }) 
{

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const handleLogin=async()=>{

  if(!email || !password){
    Alert.alert("Error","Please fill all fields")
    return
  }

  try{

    console.log("LOGIN REQUEST")

    const userCredential=await signInWithEmailAndPassword(auth,email,password)

    console.log("LOGIN SUCCESS",userCredential.user)


  }catch(error){

    console.log("LOGIN FAILED",error)

    Alert.alert("Login Failed","Invalid credentials")

  }

  }

  return(

  <View style={styles.container}>

  <Text style={styles.title}>Login</Text>

  <TextInput
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  style={styles.input}
  />

  <TextInput
  placeholder="Password"
  secureTextEntry
  value={password}
  onChangeText={setPassword}
  style={styles.input}
  />

  <TouchableOpacity
  onPress={handleLogin}
  style={styles.loginButton}
  >

  <Text style={styles.buttonText}>Login</Text>

  </TouchableOpacity>

  <Text>
    Don't have an account?
  </Text>

  <TouchableOpacity
    onPress={()=>navigation.navigate("Register")}
  >

  <Text style={styles.linkText}>
    Sign Up
  </Text>

  </TouchableOpacity>

  </View>

  )

}

// Styles-------------------------------------------------------------------------------------------------------

const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"#e8f0fe",
padding:20,
// headerShown:false
},

title:{
fontSize:30,
fontWeight:"bold",
marginBottom:30,
color:"#1a237e"
},

input:{
width:"100%",
backgroundColor:"#fff",
padding:14,
borderRadius:8,
marginBottom:15,
borderWidth:1,
borderColor:"#ccc"
},

loginButton:{
backgroundColor:"#1976d2",
width:"100%",
padding:15,
borderRadius:8,
alignItems:"center",
marginBottom:15
},

buttonText:{
color:"#fff",
fontWeight:"bold",
fontSize:16
},

linkText:{
color:"#1976d2",
fontSize:16
}

})

----------------------------------------------------------------------------------

screens/RegisterScreen.js

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase/firebaseConfig";

export default function RegisterScreen({navigation}){

const[name,setName]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")

const handleRegister=async()=>{

 if(!name || !email || !password){
   Alert.alert("Error","All fields are required")
   return
 }

 try{

   const userCredential=await createUserWithEmailAndPassword(auth,email,password)

   console.log("REGISTER SUCCESS",userCredential.user)

   Alert.alert("Account Created")

   navigation.navigate("Login")

 }catch(error){

  console.log("REGISTER FAILED", error.code)

  if(error.code === "auth/email-already-in-use"){
    Alert.alert("Register Failed","Email already in use")
  }
  else if(error.code === "auth/invalid-email"){
    Alert.alert("Register Failed","Invalid email format")
  }
  else if(error.code === "auth/weak-password"){
    Alert.alert("Register Failed","Password must be at least 6 characters")
  }
  else{
    Alert.alert("Register Failed",error.message)
  }

 }

}

return(

<View style={styles.container}>

<Text style={styles.title}>Register</Text>

<TextInput
placeholder="User Name"
value={name}
onChangeText={setName}
style={styles.input}
/>

<TextInput
placeholder="Email"
value={email}
onChangeText={setEmail}
style={styles.input}
/>

<TextInput
placeholder="Password"
secureTextEntry
value={password}
onChangeText={setPassword}
style={styles.input}
/>

<TouchableOpacity
onPress={handleRegister}
style={styles.registerButton}
>

  <Text style={styles.buttonText}>Register</Text>

</TouchableOpacity>

</View>

)

}

// Styles-------------------------------------------------------------------------------------------------------


const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"#e8f0fe",
padding:20
},

title:{
fontSize:30,
fontWeight:"bold",
marginBottom:30,
color:"#1a237e"
},

input:{
width:"100%",
backgroundColor:"#fff",
padding:14,
borderRadius:8,
marginBottom:15,
borderWidth:1,
borderColor:"#ccc"
},

registerButton:{
backgroundColor:"#43a047",
width:"100%",
padding:15,
borderRadius:8,
alignItems:"center"
},

buttonText:{
color:"#fff",
fontWeight:"bold",
fontSize:16
}

})

----------------------------------------------------------------------------------