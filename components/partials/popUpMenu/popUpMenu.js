import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
 Menu,
 MenuOptions,
 MenuTrigger,
} from "react-native-popup-menu";

import {  MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function PopUpMenu({children}) {
    
    return (
        <Menu >
          <MenuTrigger >
             <MaterialCommunityIcons
               name="dots-vertical"
               size={24}
               color="black"
             />
          </MenuTrigger>
          <MenuOptions style={[styles.container]}>
           <View style={[styles.layout]}>
            {children}
           </View>
          </MenuOptions>
        </Menu>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -177,
    marginLeft: 60
  },
  layout: {
    backgroundColor: 'white', 
    flex:1, 
    flexDirection: 'row', 
    width: 130, height: 40, 
    justifyContent: "space-between", 
    alignItems: 'center'
  }
});