import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashBoard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halo, {'\n'}Administrator</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Statistik</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={[styles.card1, { height: 300 }]}>
            <Text style={styles.cardTitle}>Jumlah Akun</Text>
            <Text style={styles.cardTitle}>{'\n'}Admin</Text>
            <Text style={styles.cardValue}>1</Text>
            <Text style={styles.cardTitle}>{'\n'}{'\n'}Petugas</Text>
            <Text style={styles.cardValue}>1</Text>
          </View>
        </View>
        <View style={styles.column2}>
          <View style={styles.card2}>
            <Text style={styles.cardTitle}>Kategori Arsip</Text>
          </View>
          <View style={styles.card3}>
            <Text style={[styles.cardValue, { color: '#FBA919' }]}>6</Text>
          </View>
          <View style={styles.card2}>
            <Text style={styles.cardTitle}>Jumlah Arsip</Text>
          </View>
          <View style={styles.card3}>
            <Text style={[styles.cardValue, { color: '#FBA919' }]}>27</Text>
          </View>
        </View>
      </View>
      <View style={styles.card4}>
            <Text style={styles.cardTitle}>Jumlah Arsip Diunduh</Text>
          </View>
          <View style={styles.card5}>
            <Text style={[styles.cardValue, { color: '#FBA919' }]}>627</Text>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0E5E5',
  },
  title: {
    marginTop: 40,
    marginBottom:30,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6EAD3B',
  },
  card: {
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 16,
    marginTop: 30,
  },
  card1: {
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  card2: {
    backgroundColor: '#25AAE2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 5,
  },
  card3: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: 160,
    marginBottom:20,
  },
  card4: {
    backgroundColor: '#25AAE2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 5,
    marginTop:10,
    height:70
  },
  card5: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: 360,
    height:80
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    height:300,
    marginBottom:10,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  column2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    height:300,
  },
});

export default DashBoard;