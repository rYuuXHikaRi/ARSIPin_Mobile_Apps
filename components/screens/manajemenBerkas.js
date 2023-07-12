import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ManajemenBerkas = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Manajemen Berkas</Text>
      </View>
      <View style={styles.card2}>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2, styles.bottomLine]}>
            Kategori Arsip
          </Text>
          <Text style={[styles.cardTitle3, styles.bottomLine]}>Data Arsip</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Tambah Kategori Arsip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Tambah Arsip Baru</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.searchButton}>
          <AntDesign name="search1" size={24} color="black" />
          <Text style={styles.searchButtonText}> Pencarian...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManajemenBerkas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F0E5E5",
  },
  card: {
    backgroundColor: "#6EAD3B",
    borderRadius: 8,
    padding: 16,
    marginTop: 50,
    height: 60,
  },
  card2: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 5,
    marginTop: 30,
    height: 460,
    width: 350,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
    height: 30,
    justifyContent: "center",
  },
  cardTitle2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6EAD3B",
    height: 30,
    justifyContent: "center",
    flex: 1,
  },
  cardTitle3: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6EAD3B",
    height: 30,
    justifyContent: "center",
    textAlign: "right",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomLine: {
    borderBottomColor: "#6EAD3B",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#6EAD3B",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
    height: 60,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  searchButton: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
    height: 60,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
});
