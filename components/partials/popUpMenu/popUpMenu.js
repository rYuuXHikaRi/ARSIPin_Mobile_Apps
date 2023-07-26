import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
 Menu,
 MenuOptions,
 MenuTrigger,
} from "react-native-popup-menu";

import {  MaterialCommunityIcons } from "@expo/vector-icons";

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
          <MenuOptions style={{marginTop: -157, marginLeft: 60}}>
           <View style={{backgroundColor: 'white', flex:1, flexDirection: 'row', width: 130, height: 40, justifyContent: "space-between", alignItems: 'center'}}>
            {children}
           </View>
          </MenuOptions>
        </Menu>
    );
}