import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from 'react-native-svg';

// Icon
import { homeActive, homeInActive, arsipActive, arsipInActive, unduhActive, 
         unduhInActive, userSettingActive, userSettingInActive, userListActive, userListInActive } from "../../assets/img/iconSet";

class Navbar extends Component {

    render() {
        const curPgStyle = (typeStyle, pageName, value1, value2) => {
            return (
                typeStyle === "StyleSheet" ? (
                    this.props.whichPage === pageName ? (
                        value1
                    ) : (
                        value2
                    )
                ) : (
                    this.props.whichPage === pageName ? (
                        <SvgXml xml={value1} width="28" height="28" />
                    )  : (
                        <SvgXml xml={value2} width="28" height="28"/>
                    )
                )
            )
        };


        const { navigation } = this.props;
        const screenWidth =  Dimensions.get('window').width;
        return (
                <View style={[{width: screenWidth},styles.container, {backgroundColor: "#ffffff"}]}>

                    {/* Arsip */}
                    <ImageBackground source={
                                                this.props.whichPage === "arsip" ? require("../../assets/img/navbarBg.png") : 
                                                                                  require("../../assets/img/navbarBgNone.png")
                        
                    }>
                    <Pressable style={styles.itemNavbar} onPress={() => this.props.navigation.replace('arsip')}>
                        {curPgStyle('SVG', 'arsip', arsipActive, arsipInActive)}
                        <Text style={{fontSize: 12, fontWeight:"400", color:this.props.whichPage === "arsip" ? "white" : "#197B40"}}>Arsip</Text>
                    </Pressable>
                    </ImageBackground>

                    {/* Unduhan */}
                    <ImageBackground source={
                                                this.props.whichPage === "unduhan" ? require("../../assets/img/navbarBg.png") : 
                                                                                  require("../../assets/img/navbarBgNone.png")
                        
                    }>
                        <Pressable style={styles.itemNavbar} onPress={() => this.props.navigation.replace('unduhan')}>
                            {curPgStyle('SVG', 'unduhan', unduhActive, unduhInActive)}
                            <Text style={{fontSize: 12, fontWeight:"400", color:this.props.whichPage === "unduhan" ? "white" : "#197B40"}}>Unduhan</Text>
                        </Pressable>
                    </ImageBackground>

                    {/* Home */}
                    <ImageBackground source={
                                                this.props.whichPage === "home" ? require("../../assets/img/navbarBg.png") : 
                                                                                  require("../../assets/img/navbarBgNone.png")
                        
                    }>
                        <Pressable style={[styles.itemNavbar]} onPress={() => this.props.navigation.replace('home')}>
                            {curPgStyle('SVG', 'home', homeActive, homeInActive)}
                            <Text style={{fontSize: 12, fontWeight:"400", color: this.props.whichPage === "home" ? "white" : "#197B40"}}>Home</Text>
                        </Pressable>
                    </ImageBackground>

                    {/* UserList */}
                    <ImageBackground source={
                                                this.props.whichPage === "userList" ? require("../../assets/img/navbarBg.png") : 
                                                                                  require("../../assets/img/navbarBgNone.png")
                        
                    }>
                        <Pressable style={styles.itemNavbar} onPress={() => this.props.navigation.replace('userList')}>
                            {curPgStyle('SVG', 'userList', userListActive, userListInActive)}
                            <Text style={{fontSize: 12, fontWeight:"400", color: this.props.whichPage === "userList" ? "white" : "#197B40"}}>Data Akun</Text>
                        </Pressable>
                    </ImageBackground>

                    {/* UserSetting */}
                    <ImageBackground source={
                                                this.props.whichPage === "userSetting" ? require("../../assets/img/navbarBg.png") : 
                                                                                  require("../../assets/img/navbarBgNone.png")
                        
                    }>
                        <Pressable style={styles.itemNavbar} onPress={() => this.props.navigation.replace('userSetting')}>
                            {curPgStyle('SVG', 'userSetting', userSettingActive, userSettingInActive)}
                            <Text style={{fontSize: 12, fontWeight:"400", color: this.props.whichPage === "userSetting" ? "white" : "#197B40"}}>Saya</Text>
                        </Pressable>
                    </ImageBackground>

                </View>
        );
    }
}
export default function (props) {
    const navigation = useNavigation();
    return <Navbar {...props} navigation={navigation} />;
  };

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection : 'row',
        alignItems : "center",
        justifyContent: 'space-around',
        paddingTop: 8,
        paddingBottom: 8,
    },
    navbarText:{
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 16,
        color: "#CBE4DE",

        alignSelf: "center",
    },
    itemNavbar:{
        alignItems: "center",
        justifyContent: "center",

        width: 60,
        height: 50,

    },
});
