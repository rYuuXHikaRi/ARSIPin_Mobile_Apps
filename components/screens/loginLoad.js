import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getUserFromStore } from "../middleware/actions/loginAction";

const LoadLogin = ({navigation}) => {
  const token = useSelector((state) => state.tokenSession);
  const userData = useSelector((state) => state.userData);
  const [tokenSession, setTokenSession] = useState(null);
  const dispatch = useDispatch();

  const getTokenOnLocalStorage = async () => {
    try {
      console.log("From Login Load, Getting Token From Local Storage...");
      const value = await AsyncStorage.getItem('token');
      if(value) {
        setTokenSession(value);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  useEffect(() => {
     getTokenOnLocalStorage();
  }, [])

  useEffect(() => {
    dispatch(getUserFromStore(tokenSession));
  }, [tokenSession, dispatch]);
  
  useEffect(() => {
    if(userData !== null) {
        navigation.replace('dashboard');
    }
  }, [userData])
  
  return (
    <View style={styles.container}>
      <Text>Loading Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadLogin;