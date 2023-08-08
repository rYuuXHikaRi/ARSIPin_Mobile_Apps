import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, 
         ImageBackground, TextInput, Pressable, 
         Keyboard, TouchableWithoutFeedback, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Local
import GradientText from '../partials/gradientText';
import { loginBg } from '../../assets/img/svgAssets';

// Local middleware
import { UserContext } from '../middleware/Contexts/userContext';
import { loginRequest } from '../middleware/actions/loginAction';


const screenWidth = Dimensions.get('window').width;
const logoWidth = 113 * 1.3; const logoHeight = 57 * 1.3;

const LoginPage = ({navigation}) => {
  const [loginData, setLoginData] = useState({username: '', password: ''});
  const { userData } = useContext(UserContext);
  const [keyBoardStat, setKeyboardStat] = useState('notshowed');
  const [isLoggedInPressed, setIsLoggedInPressed] = useState(false);
  const token = useSelector((state) => state.tokenSession);
  const [tokenSession, setTokenSession] = useState(null);
  const dispatch = useDispatch();


  const updateUserName = (userNameValue) => {
    setLoginData({...loginData, username: userNameValue});
  }

  const updatePassWord = (passWordValue) => {
    setLoginData({...loginData, password: passWordValue});
  }

  const checkTokenOnLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if(value !== null) {
        navigation.navigate('loadlogin');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  const setTokenOnLocalStorage = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStat('notshowed');
      // Logika atau aksi yang ingin Anda jalankan saat keyboard hilang
    });

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStat('showed');
      // Logika atau aksi yang ingin Anda jalankan saat keyboard hilang
    });

    return () => {
      keyboardDidHideListener.remove(); // Membersihkan event listener saat komponen dilepas
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    checkTokenOnLocalStorage();
  }, [])

  useEffect(() => {
    if(isLoggedInPressed){
      dispatch(loginRequest(loginData.username, loginData.password));
      setIsLoggedInPressed(false);
    }
  }, [isLoggedInPressed, dispatch])

  useEffect(() => {
    if(token) {
      console.log("Token Get Success");
      setTokenOnLocalStorage(token);
      // console.log("Token changed!");
      // console.log("Token: ", token);
      navigation.navigate('loadlogin');
      
    }
  }, [token])

  console.log(keyBoardStat);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{backgroundColor: '#F0E5E5'}}> 
          <ImageBackground source={require('../../assets/img/loginBg_dmp.png')} style={{width: screenWidth, height: '100%'}}> 
            <SvgXml xml={loginBg} width={screenWidth + 0.3} style={{position: 'absolute', top: 0,}}/>
            <View style={styles.container}>
              <SafeAreaView>
                <View style={styles.logoContainer}>
                  <Image source={require('../../assets/img/logoGGP_white.png')} style={styles.logo}/>
                </View>
                
                <View style={styles.contentContainer}>
                    <View style={styles.greetingTextContainer}>
                      <Text style={styles.greetingText}>Halo,</Text>
                      <Text style={styles.greetingText}>Selamat Datang.</Text>
                    </View>

                    <View style={keyBoardStat === 'showed' ? styles.loginFormContainerKBShowed : styles.loginFormContainer}>
                      <GradientText 
                                    colors={keyBoardStat === 'showed' ? ['#FFFFFF', '#FFFFFF'] : ['#A6CE39', '#197B40']} x1={-10} y1={6} x2={15} y2={6} 
                                    style={styles.loginText}
                      >Masuk</GradientText>

                      <View style={styles.loginForm}>
                          <View style={[styles.loginCompShape, styles.loginInput]}>
                            <TextInput
                                        placeholder='Nama Pengguna / E-mail'
                                        onChangeText={(usrnm) => updateUserName(usrnm)}
                            />
                          </View>

                          <View style={[styles.loginCompShape, styles.loginInput]}>
                            <TextInput
                                          placeholder='Kata Sandi'
                                          secureTextEntry={true}
                                          onChangeText={(pwd) => updatePassWord(pwd)}
                            />
                          </View>

                          <TouchableOpacity onPress={() => {console.log('Button Login Pressed'); setIsLoggedInPressed(true)}} style={{marginTop: 7}}>
                            <LinearGradient
                                            colors={['#90C13B', '#7CB53C', '#378D3F']}
                                            start={[0, 0.5]}
                                            end={[1, 0.5]}
                                            style={[styles.loginCompShape, styles.loginButton]}
                            >
                              <Text style={styles.loginButtonText}>Masuk</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                      </View>
                    </View>

                </View>
              </SafeAreaView>
            </View>
          </ImageBackground>
          <StatusBar style="light" />
        </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: logoWidth, 
    height: logoHeight, 
    resizeMode: 'cover'
  },
  contentContainer: {
    marginTop: 70,
    paddingLeft: 25,
  },

  greetingTextContainer: {
    width: 330,
    height: 125,
    marginLeft: 9,
  },
  greetingText: {
    fontSize: 48,
    fontWeight: '800',
    color: 'white',
  },
  loginFormContainer: {
    marginTop: 336
  },
  loginFormContainerKBShowed: {
    marginTop: 40,
  },
  loginText: {
    fontSize: 20,
    fontWeight: '700',
  },
  loginForm: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loginCompShape: {
    width: 321,
    height: 43,
    borderRadius: 10,
    marginTop: 12,
  },
  loginInput: {
    paddingLeft: 16,
    justifyContent: 'center',

    backgroundColor: 'white',
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',

    color: 'white'
  }
});
