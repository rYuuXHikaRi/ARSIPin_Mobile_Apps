import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>

      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Nama:</Text>
       
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Username:</Text>
      
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>No. HP:</Text>
     
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Password Lama:</Text>
        
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Password Baru:</Text>
       
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },

  attributeContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  attributeTitle: {
    width: 120,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },


});

export default ProfilePage;
