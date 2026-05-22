import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
} from "react-native";

import { styles } from "../styles/AuthStyles";

type CustomTextInputProps = TextInputProps & {
  inputStyle?: StyleProp<TextStyle>;
};

export default function CustomTextInput({
  inputStyle,
  ...props
}: CustomTextInputProps) {
  return (
    <TextInput
      {...props}
      style={[styles.input, inputStyle]}
      placeholderTextColor="#666"
    />
  );
}