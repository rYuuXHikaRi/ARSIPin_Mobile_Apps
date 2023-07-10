import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RiwayatUnduhan = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Riwayat Unduhan</Text>
      </View>
      <View style={styles.card2}>
        <View style={styles.row}>
        
        <View style={styles.card6}>


    </View>

        </View>
      </View>
      
    </View>
  );
};

export default RiwayatUnduhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0E5E5',
  },
  card: {
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 16,
    marginTop: 50,
    height: 60,
  },
  card2: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 5,
    marginTop: 30,
    height: 460,
    width: 350,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    height: 30,
    justifyContent: 'center',
  },

  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card6: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 315,
    height: 60,
  },
  attributeTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },


});
