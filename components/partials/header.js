import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Pressable
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation  } from "@react-navigation/native";

class Header extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView>
                <View style={[styles.container, {backgroundColor: "#2C3333"}]}>
                    <Pressable onPress={() => this.props.navigation.goBack()}>
                        <Octicons name="arrow-left" size={30} style={{color: "#CBE4DE"}}/>
                    </Pressable>
                    <Text style={styles.headerText}>{this.props.headerTitle}</Text>
                    <View style={styles.dummyItem}></View>   
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
    headerText:{
        fontWeight: "700",
        fontSize: 20,
        color: "#CBE4DE",
    },
    dummyItem : {
        width: 280,
        height: 30,
    },
});