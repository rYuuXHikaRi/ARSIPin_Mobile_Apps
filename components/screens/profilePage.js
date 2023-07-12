import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

import AndroidSafeView from "../AndroidSafeView";
import Navbar from '../partials/navbar';
import Header from '../partials/header';

const ProfilePage = () => {
  return (
    <SafeAreaView style={[AndroidSafeView.AndroidSafeArea]}>
      <View style={styles.container}>
        <View style={{position: 'absolute', top: 0}}>
          <Header/>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={require('../../assets/profile.png')}
          />
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoButtonText}>Ganti Foto</Text>
          </TouchableOpacity>
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

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>

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
    padding: 16,
    backgroundColor: '#F0E5E5',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 50,
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
