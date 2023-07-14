import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Table, Row } from 'react-native-table-component';

const ManajemenBerkas = () => {
  const tableHead = ['Nama', 'Lokasi', 'Aksi'];
  const tableData = [
    ['File 1', 'Lokasi 1', renderOpsiIcons()],
    ['File 2', 'Lokasi 2', renderOpsiIcons()],
    ['File 3', 'Lokasi 3', renderOpsiIcons()],
    // tambahkan data lainnya di sini sesuai kebutuhan
  ];

  function renderOpsiIcons() {
    return (
      <View style={styles.opsiContainer}>
        <TouchableOpacity style={styles.opsiButton}>
          <AntDesign name="edit" size={25} color="#34A63A"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opsiButton}>
          <AntDesign name="eye" size={25} color="#34A63A" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.boldText]}>Manajemen Berkas</Text>
      </View>
      <View style={styles.card2}>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2, styles.bottomLine]}>Kategori Arsip</Text>
        </View>
        <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
          <Row data={tableHead} style={[styles.header, styles.boldText]} textStyle={[styles.text, styles.boldText]} />
          {tableData.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[styles.row, index % 2 && { backgroundColor: '#e1fcc5' }]}
              textStyle={styles.text}
            />
          ))}
        </Table>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, styles.boldText]}>+ Tambah Kategori Arsip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, styles.boldText]}>+ Tambah Arsip Baru</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.searchButton}>
          <AntDesign name="search1" size={24} color="black" />
          <Text style={[styles.searchButtonText, styles.boldText]}>   Pencarian...</Text>
        </TouchableOpacity>
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
    marginBottom: 8,
    color: 'white',
    height: 30,
    justifyContent: 'center',
  },
  cardTitle2: {
    fontSize: 20,
    marginBottom: 8,
    color: '#6EAD3B',
    height: 30,
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomColor: '#6EAD3B',
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
    height: 60,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'black',
    textAlign: 'left',
  },
  header: {
    height: 50,
    backgroundColor: '#A6D17A',
  },
  text: {
    textAlign: 'center',
    fontWeight: '300',
    
  },
  boldText: {
    fontWeight: 'bold',
  },
  dataWrapper: {
    marginTop: -1,
  },
  opsiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  opsiButton: {
    marginHorizontal: 5,
  },
});

export default ManajemenBerkas;
