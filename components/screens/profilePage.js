import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
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
        <TextInput style={styles.attributeValue} placeholder="Masukkan Nama" />
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Username:</Text>
        <TextInput style={styles.attributeValue} placeholder="Masukkan Username" />
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>No HP:</Text>
        <TextInput style={styles.attributeValue} placeholder="Masukkan No HP" />
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Password Lama:</Text>
        <TextInput style={styles.attributeValue} placeholder="Masukkan Password Lama" secureTextEntry={true} />
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Password Baru:</Text>
        <TextInput style={styles.attributeValue} placeholder="Masukkan Password Baru" secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 20,
    marginTop:50,
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
  },
  attributeValue: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6EAD3B',
    borderRadius: 8,
    padding: 8,
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
