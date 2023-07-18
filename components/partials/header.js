import React, { Component } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Pressable,
    Image,
    Dimensions
} from "react-native";
import { useNavigation  } from "@react-navigation/native";

class Header extends Component {
    render() {
        const screenWidth = Dimensions.get('window').width;
        const logoWidth = 113 * 1.2; const logoHeight = 57 * 1.2;
        const { navigation } = this.props;
        return (
            <SafeAreaView>
                <View style={[styles.container, {backgroundColor: "white", width: screenWidth}]}>
                   <View style={styles.pingIndicator}/>
                    <Image source={require('../../assets/img/logoGGP.png')} style={{width: logoWidth, height: logoHeight}}/>  
                    <Pressable>
                        <View style={styles.profileContainer}>
                            <Image source={require('../../assets/img/profileTmp.jpeg')} style={styles.croppedProfile}/>
                        </View>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Header {...props} navigation={navigation} />;
  };;

const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems : "center",
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: "#CBE4DE",

        paddingRight: 13,
        paddingLeft: 13,
    },
    pingIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,

        backgroundColor: "#197b40",
    },
    profileContainer : {
        width: 30,
        height: 30,
        overflow: "hidden",
    },
    croppedProfile :{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

        borderRadius: 50,
        borderColor: "#197b40",
    },
});