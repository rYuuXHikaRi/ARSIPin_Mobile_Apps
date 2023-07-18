import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "../partials/header";
import Navbar from "../partials/navbar";

const ManajemenBerkas = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [namadokumen, setnamadokumen] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [tahun, settahun] = useState("");
  const [namadesa, setnamadesa] = useState("");
  const [lokasipenyimpanan, setlokasipenyimpanan] = useState("");
  const [namafile, setnamafile] = useState("");

  const handleSave = () => {
    // Lakukan sesuatu dengan data yang diisi
    console.log("namadokumen:", namadokumen);
    console.log("Nama Lengkap:", keterangan);
    console.log("tahun:", tahun);
    console.log("namadesa:", namadesa);
    console.log("namafile:", namafile);

    // Setelah melakukan sesuatu, tutup modal
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "absolute", top: 0 }}>
        <Header />
      </View>
      <LinearGradient
                      colors={['#197B40', '#79B33B', '#A6CE39']}
                      start={[0, 0.5]}
                      end={[1, 0.5]}
                      style={[styles.card]}
      > 
        <Text style={styles.cardTitle}>Manajemen Berkas</Text>
      </LinearGradient>
      <View style={styles.card2}>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2, styles.bottomLine]}>Data Arsip</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={[styles.buttonX, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.X}>X</Text>
              </TouchableOpacity>

              <View style={styles.Headtitle}>
                <Text style={[styles.bottomLine, styles.titleModal]}>
                  Tambah Arsip Baru
                </Text>
              </View>
              <View>
                <View style={styles.styletitle2}>
                  <Text style={styles.titleform}>Nama Dokumen</Text>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Nama Dokumen"
                    onChangeText={(text) => setnamadokumen(text)}
                  />
                </View>

                <View style={styles.styletitle2}>
                  <Text style={styles.titleform}>Keterangan</Text>
                  <TextInput
                    style={styles.inputketerangan}
                    placeholder="Keterangan"
                    onChangeText={(text) => setketerangan(text)}
                  />
                </View>
              </View>
              <Text style={styles.titleform}>Tahun</Text>
              <TextInput
                style={styles.input}
                placeholder="tahun"
                onChangeText={(text) => settahun(text)}
              />

              <Text style={styles.titleform}>Nama Desa</Text>
              <TextInput
                style={styles.input}
                placeholder="Nama Desa"
                onChangeText={(text) => setnamadesa(text)}
              />

              <View>
                <View style={styles.styletitle2}>
                  <Text style={styles.titleform}>Lokasi Penyimpanan</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Loker"
                    onChangeText={(text) => settahun(text)}
                  />
                </View>

                <View style={styles.styletitle4}>
                  <Text style={styles.titleformupload}>Upload File</Text>
                  <TextInput
                    style={styles.inputFile}
                    placeholder="Pilih"
                  ></TextInput>
                </View>
              </View>

              <View style={styles.btnsave}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={handleSave}
                >
                  <Text style={styles.textStyle}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.row}>
        <LinearGradient
                        colors={['#90C13B', '#7CB53C', '#378D3F']}
                        start={[0, 0.5]}
                        end={[1, 0.5]}
                        style={styles.button}
        > 
          <TouchableOpacity onPress={() => setModalVisible(true)} >
            <Text style={styles.buttonText}>+ Tambah Arsip Baru</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={{ position: "absolute", bottom: 0 , backgroundColor: '#F0E5E5'}}>
        <View style={[styles.row, {paddingLeft: 18, paddingRight: 18, marginBottom: 20}]}>
          <View style={styles.searchButton}>
            <AntDesign name="search1" size={20} color="black" />
            <TextInput
                      placeholder="Cari data..."
                      style={styles.searchButtonText}
            />
          </View>
        </View>
        <Navbar whichPage="arsip" />
      </View>
    </SafeAreaView>
  );
};

export default ManajemenBerkas;
const styles = StyleSheet.create({
  //Modal Style
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 354,
    height: 624,
    marginLeft: 20,
    marginRight: 20,
    marginTop: -130,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonX: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
    alignItems: "flex-end",
    marginLeft: 330,
    marginTop: -15,
  },
  X: {
    alignContent: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FBA919",
    alignItems: "flex-end",
  },
  buttonSave: {
    backgroundColor: "#6EAD3B",
    width: 109,
    height: 43,
  },
  btnsave: {
    width: 109,
    height: 73,
    marginLeft: 15,
    marginTop: -10,
    paddingTop: 10,
  },
  textStyle: {
    color: "#F6F6F6",
    fontWeight: "bold",
    textAlign: "center",
  },
  titleModal: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    color: "#6EAD3B",
    paddingBottom: 8,
  },
  titleform: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 0,
    marginLeft: 18,
    color: "#6EAD3B",
    height: 30,
    flexDirection: "column",
  },
  titleformupload: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 0,
    marginLeft: 18,
    color: "#6EAD3B",
    height: 30,
    paddingVertical: 5,
  },
  input: {
    width: 319,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginLeft: 18,
    marginRight: 18,
  },
  inputWithBorder: {
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "solid",
  },
  inputketerangan: {
    width: 319,
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginLeft: 18,
    marginRight: 18,
  },
  inputFile: {
    width: 135,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginLeft: 18,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#D7DF23",
  },
  styletitle: {
    flexDirection: "row",
    paddingTop: 18,
  },
  styletitle2: {
    justifyContent: "space-between",
  },
  styletitle3: {
    flexDirection: "row",
  },
  styletitle4: {
    flexDirection: "row",
    paddingTop: 10,
  },
  Headtitle: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  pickerSelectStyles: {
    padding: 1,
  },
  //--end
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F0E5E5",
  },
  card: {
    borderRadius: 8,
    marginTop: 76,
    paddingLeft: 12,
    height: 43,

    justifyContent: 'center'
  },
  card2: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 5,
    marginTop: 15,
    height: 460,
    width: 350,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
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
    marginBottom: 4,
  },
  button: {
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    height: 43,
    marginTop: 17,

    justifyContent: 'center'
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  searchButton: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
    height: 43,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",

    paddingLeft: 7,
  },
  searchButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
});
