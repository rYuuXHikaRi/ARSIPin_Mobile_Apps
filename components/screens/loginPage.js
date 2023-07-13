import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, 
         ImageBackground, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

// Local
import GradientText from '../partials/gradientText';

import { loginBg } from '../../assets/img/svgAssets';

const screenWidth = Dimensions.get('window').width;
const logoWidth = 113 * 1.3; const logoHeight = 57 * 1.3;

const LoginPage = ({navigation}) => {
  return (
        <View style={{backgroundColor: '#F0E5E5'}}> 
          <ImageBackground source={require('../../assets/img/loginBg_dmp.png')} style={{width: screenWidth, height: '100%'}}> 
            <SvgXml xml={loginBg} width={screenWidth + 0.3} style={{position: 'absolute', top: 0,}}/>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
              <SafeAreaView>
                <View style={styles.logoContainer}>
                  <Image source={require('../../assets/img/logoGGP_white.png')} style={styles.logo}/>
                </View>
                
                <View style={styles.contentContainer}>
                  <View style={styles.greetingTextContainer}>
                    <Text style={styles.greetingText}>Halo,</Text>
                    <Text style={styles.greetingText}>Selamat Datang.</Text>
                  </View>

                  <View style={styles.loginFormContainer}>
                    <GradientText 
                                  colors={['#A6CE39', '#197B40']} x1={-10} y1={6} x2={15} y2={6} 
                                  style={styles.loginText}
                    >Masuk</GradientText>

                    <View style={styles.loginForm}>
                
                        <View style={[styles.loginCompShape, styles.loginInput]}>
                          <TextInput
                                      placeholder='Nama Pengguna / E-mail'
                          />
                        </View>

                        <View style={[styles.loginCompShape, styles.loginInput]}>
                          <TextInput
                                        placeholder='Kata Sandi'
                          />
                        </View>

                        <Pressable onPress={() => {console.log('Login Button Pressed')}} style={{marginTop: 7}}>
                          <LinearGradient
                                          colors={['#90C13B', '#7CB53C', '#378D3F']}
                                          start={[0, 0.5]}
                                          end={[1, 0.5]}
                                          style={[styles.loginCompShape, styles.loginButton]}
                          >
                            <Text style={styles.loginButtonText}>Masuk</Text>
                          </LinearGradient>
                        </Pressable>
                    </View>

                  </View>

                </View>
              </SafeAreaView>
            </KeyboardAvoidingView>
          </ImageBackground>
          <StatusBar style="light" />
        </View>
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
