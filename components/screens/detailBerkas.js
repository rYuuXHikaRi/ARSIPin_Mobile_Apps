import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView
} from "react-native";
import { AntDesign, MaterialCommunityIcons ,FontAwesome} from '@expo/vector-icons';
import { Table, Row } from 'react-native-table-component';
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from 'expo-linear-gradient';
import AndroidSafeView from "../AndroidSafeView";
import Header from "../partials/header";
import Navbar from "../partials/navbar";
import { useEffect } from "react";

const DetailBerkas = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [NamaDokumen, setNamaDokumen] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [Tahun, setTahun] = useState("");
  const [NamaDesa, setNamaDesa] = useState("");
  const [LokasiPenyimpanan, setLokasiPenyimpanan] = useState("");
  const [namafile, setnamafile] = useState("");
  const [fileDetail, setFileDetail] = useState(null);
  const { user } = route.params;

  console.log(1);
  console.log(user);
  console.log(1);

  useEffect(() => {
    // Lakukan pengambilan data detail file dari endpoint Laravel menggunakan fileId
    fetch(`http://192.168.192.213:8000/api/arsips/8`)
    .then(response => response.json())
    .then(data => {
      setFileDetail(data);
    })
    .catch(error => {
      console.error('Error fetching user detail:', error);
    });
  }, [user.id]);
  
  console.log(fileDetail);
  const tableHead = ['Nama File', 'Aksi'];
  const tableData = [
    [<TouchableOpacity onPress={() => console.log('File 1')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>File 1</Text>
    </TouchableOpacity>, renderOpsiIcons()],
    [<TouchableOpacity onPress={() => console.log('File 2')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>File 2</Text>
    </TouchableOpacity>, renderOpsiIcons()],
    [<TouchableOpacity onPress={() => console.log('File 3')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>File 3</Text>
    </TouchableOpacity>, renderOpsiIcons()],
        [<TouchableOpacity onPress={() => console.log('File 3')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>File 3</Text>
    </TouchableOpacity>, renderOpsiIcons()],    [<TouchableOpacity onPress={() => console.log('File 3')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>File 3</Text>
    </TouchableOpacity>, renderOpsiIcons()],    [<TouchableOpacity onPress={() => console.log('File 3')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>File 3</Text>
    </TouchableOpacity>, renderOpsiIcons()],    [<TouchableOpacity onPress={() => console.log('File 3')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>File 3</Text>
    </TouchableOpacity>, renderOpsiIcons()],    [<TouchableOpacity onPress={() => console.log('File 3')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>File 3</Text>
    </TouchableOpacity>, renderOpsiIcons()],    [<TouchableOpacity onPress={() => console.log('File 3')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>File 3</Text>
    </TouchableOpacity>, renderOpsiIcons()],
    // tambahkan data lainnya di sini sesuai kebutuhan
  ];

  function renderOpsiIcons() {
    return (
        <View style={styles.opsiContainer}>
        <TouchableOpacity style={[styles.opsiButton, styles.greenButton]}>
          <MaterialCommunityIcons
            name="eye"
            size={25}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.opsiButton, styles.yellowButton]}>
          <FontAwesome
            name="trash"
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  }

  const handleSave = () => {
    // Lakukan sesuatu dengan data yang diisi
    console.log("NamaDokumen:", NamaDokumen);
    console.log("Nama Lengkap:", Keterangan);
    console.log("Tahun:", Tahun);
    console.log("NamaDesa:", NamaDesa);
    console.log("namafile:", NamaFile);

    // Setelah melakukan sesuatu, tutup modal
    setModalVisible(false);
  };

  const renderOpsiModal = () => {
    return (
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
                  onChangeText={(text) => setNamaDokumen(text)}
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
              placeholder="Tahun"
              onChangeText={(text) => setTahun(text)}
            />

            <Text style={styles.titleform}>Nama Desa</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Desa"
              onChangeText={(text) => setNamaDesa(text)}
            />

            <View>
              <View style={styles.styletitle2}>
                <Text style={styles.titleform}>Lokasi Penyimpanan</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Loker"
                  onChangeText={(text) => setTahun(text)}
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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "absolute", top: 0 }}>
        <Header />
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.boldText]}>Manajemen Berkas</Text>
      </View>
      <View style={styles.card2}>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2, styles.bottomLine]}>Detail Arsip</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2]}>Nama : {user.NamaDokumen}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2]}>Tahun: {user.Tahun}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2]}>Desa : {user.NamaDesa}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2]}>Lokasi Penyimpanan : {user.LokasiPenyimpanan}</Text>
        </View>
        <ScrollView>
        <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
          <Row data={tableHead} flexArr={[4, 1]} style={[styles.header, styles.boldText]} textStyle={[styles.text, styles.boldText, { fontSize: 20 }]} />
          {tableData.map((rowData, index,columnData) => (
            <Row
              key={index}
              data={rowData}flexArr={[4, 1]}
              
              style={[styles.row, index % 2 && { backgroundColor: '#e1fcc5' }]}
              textStyle={styles.text}
            />
          ))}
        </Table>
        </ScrollView>
      </View>
      <View style={styles.row}>
        {renderOpsiModal()}
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>+ Tambah Arsip Baru</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.searchButton}>
          <AntDesign name="search1" size={24} color="black" />
          <Text style={styles.searchButtonText}> Pencarian...</Text>
        </TouchableOpacity>
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <Navbar whichPage="arsip" />
      </View>
    </SafeAreaView>
  );
};

export default DetailBerkas;

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
    marginBottom: 4,
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
    paddingVertical: 10,
  },
  searchButton: {
    backgroundColor: "white",
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
    flexDirection: "row",
    alignItems: "center",
  },
  searchButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  tableText: {
    textAlign: 'center',
  },
});
