import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, 
         TextInput, TouchableOpacity, Platform,
         StatusBar as StatBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import Navbar from '../partials/navbar';
import Header from '../partials/header';

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  

  const pickImage= async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      console.log(result);

      if (!result.canceled) {
        setSelectedImg(result.assets[0].uri);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const storeUserData = async () => {

  };

  return (
    <SafeAreaView style={styles.container}>
      <Header style={{position: 'absolute', top: Platform.OS === 'android' ? StatBar.currentHeight : 0 }}/>
      <View style={{ flex: 1, padding: 16, backgroundColor: '#F0E5E5' }}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={selectedImg === null ? require('../../assets/profile.png') : {uri: selectedImg}}
          />
          <LinearGradient
                    colors={['#90C13B', '#7CB53C', '#378D3F']}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    style={styles.changePhotoButton}
          > 
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.changePhotoButtonText}>Ganti Foto</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeTitle}>Nama:</Text>
          <View style={styles.attributeValueContainer}>
            <TextInput style={styles.attributeValue} placeholder="Masukkan Nama" />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeTitle}>Username:</Text>
          <View style={styles.attributeValueContainer}>
            <TextInput style={styles.attributeValue} placeholder="Masukkan Username" />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeTitle}>No HP:</Text>
          <View style={styles.attributeValueContainer}>
            <TextInput style={styles.attributeValue} placeholder="Masukkan No HP" />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeTitle}>Password Lama:</Text>
          <View style={styles.attributeValueContainer}>
            <TextInput style={styles.attributeValue} placeholder="Masukkan Password Lama" secureTextEntry={true} />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeTitle}>Password Baru:</Text>
          <View style={styles.attributeValueContainer}>
            <TextInput style={styles.attributeValue} placeholder="Masukkan Password Baru" secureTextEntry={true} />
          </View>
        </View>
        <LinearGradient
                  colors={['#90C13B', '#7CB53C', '#378D3F']}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  style={styles.saveButton}
        > 
          <TouchableOpacity >
            <Text style={styles.saveButtonText}>Simpan</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={{position: 'absolute', bottom: 0}}>
          <Navbar whichPage="userSetting"/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  changePhotoButton: {
    marginTop: 10,
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 10,
  },
  changePhotoButtonText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
  attributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  attributeTitle: {
    fontWeight: 'bold',
    marginRight: 10,
    flex: 1,
    textAlign: 'left',
  },
  attributeValueContainer: {
    flex: 2,
    height:38,
  },
  attributeValue: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6EAD3B',
    borderRadius: 8,
    padding: 8,
    fontSize:15,
  },
  saveButton: {
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfilePage;
