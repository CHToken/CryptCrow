import React, { useState } from "react";
import { useFonts } from "expo-font";
import { showMessage } from "react-native-flash-message";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { login } from "../service/AuthService";
import { MaterialIcons } from "@expo/vector-icons";
import ValidationUtils from "../utils/ValidationUtils";
import Background from "../Background";
import { Ionicons } from "@expo/vector-icons";
import styles from "./LoginStyles";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [fontsLoaded] = useFonts({
    "Font-Bolds": require("../../assets/fonts/DMSans-Bold.ttf"),
  });

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Validate input fields
    if (!ValidationUtils.isValidEmail(email) || password === "") {
      showMessage({
        message: "Invalid Credentials, Please enter a valid email and password",
        type: "danger",
      });
      return;
    }
    setIsLoading(true);

    try {
      const { token, userData, error } = await login(email, password);

      if (error) {
        showMessage({
          message: error,
          type: "danger",
        });
      } else {
        // to store the user token and data
        console.log("User Token:", token);
        console.log("User Data:", userData);

        // Reset input fields
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleForgotPassword = () => {
    navigation.navigate("PasswordReset");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/images/swiftpeer.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.backIconContainer}>
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.titlepart}>
          <Text style={styles.loginTitle}>
            <Text style={styles.topicon}>Hi, 👋</Text>
            {"\n"}Welcome Back!
          </Text>
          <Text style={styles.loginSubTitle}>
            Sign in now to access your account and all the features!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            <MaterialIcons name="email" size={16} style={styles.icon} /> Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            <MaterialIcons name="lock" size={16} style={styles.icon} /> Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={togglePasswordVisibility}
          >
            <MaterialIcons
              name={showPassword ? "visibility-off" : "visibility"}
              size={25}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="green" />
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.alternateText}>
          Don't have an account?{" "}
          <Text style={styles.linkText} onPress={handleRegister}>
            <Text style={styles.span}>Sign Up</Text>
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  );
};

export default Login;
