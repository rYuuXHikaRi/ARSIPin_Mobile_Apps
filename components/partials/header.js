import React, { Component } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Pressable,
    Image,
    Dimensions,
    Text,
    StatusBar
} from "react-native";
import { useNavigation  } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

class Header extends Component {
    render() {
        const screenWidth = Dimensions.get('window').width;
        const logoWidth = 113 * 1.2; const logoHeight = 57 * 1.2;
        const { navigation } = this.props;
        return (
            <View>
                {this.props.pageType === "detailPage" ? (
                    <View style={[styles.container, {backgroundColor: "white", width: screenWidth}]}>
                        <Pressable onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="#6EAD3B" />
                        </Pressable>
                        <Text style={styles.hdrTittle}>
                            {this.props.namePage}
                        </Text>
                        {/* <Image source={require('../../assets/img/logoGGP.png')} style={{width: logoWidth, height: logoHeight}}/>   */}
                        <View/>
                    </View>
                ) : (
                    <View style={[styles.container, {backgroundColor: "white", width: screenWidth}]}>
                        <View style={styles.pingIndicator}/>
                        <Image source={require('../../assets/img/logoGGP.png')} style={{width: logoWidth, height: logoHeight}}/>  
                        <Pressable style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}} onPress={() => {console.log('test')}}>
                            <View style={styles.profileContainer}>
                                <Image source={require('../../assets/img/profileTmp.jpeg')} style={styles.croppedProfile}/>
                            </View>
                        </Pressable>
                    </View>
                )}
            </View>
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

    hdrTittle :{
        fontSize: 18,
        fontWeight: "bold",
        color: "#6EAD3B",
        marginLeft: -25,
    }
});