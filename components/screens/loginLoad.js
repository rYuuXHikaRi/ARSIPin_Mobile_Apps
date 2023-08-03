import React, {  useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector,useDispatch } from "react-redux";

import { getUserFromStore } from "../middleware/actions/loginAction";

const LoadLogin = ({navigation}) => {
  const token = useSelector((state) => state.tokenSession);
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFromStore(token));
  }, [dispatch]);
  
  useEffect(() => {
    if(userData) {
        navigation.replace('dashboard');
    }
  }, [userData])
  
  
  console.log("Token from loadingscreen: ", token);
  console.log(userData);
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