import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import AndroidSafeView from '../AndroidSafeView';
import Header from '../partials/header';
import Navbar from '../partials/navbar';

const LoginPage = ({navigation}) => {
  return (
    <SafeAreaView style={[styles.container, AndroidSafeView.AndroidSafeArea]}>
        <View style={styles.container}>
            <View style={{position: "absolute", top: 0,}}>
                <Header headerTitle="   Detail"/>
            </View>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
            <View style={{position: "absolute", bottom: 0,}}>
                <Navbar whichPage="home"/>
            </View>
        </View>
    </SafeAreaView>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
