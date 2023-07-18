import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Table, Row } from "react-native-table-component";
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from "expo-linear-gradient";
import AndroidSafeView from "../AndroidSafeView";
import Header from "../partials/header";
import Navbar from "../partials/navbar";
import { useEffect } from "react";
import axios from "axios";

const ManajemenBerkas = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [namadokumen, setnamadokumen] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [tahun, settahun] = useState("");
  const [namadesa, setnamadesa] = useState("");
  const [lokasipenyimpanan, setlokasipenyimpanan] = useState("");
  const [namafile, setnamafile] = useState("");
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [modalOpsVisible, setModalOpsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    renderOpsiIcons();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://192.168.118.213:8000/api/arsips");
      const data = await response.json();
      setUsers(data);
      tableData.splice(0, tableData.length);

      users.map((user) =>
        tableData.push([
          <TouchableOpacity
            onPress={() => navigation.navigate("detailberkas", { user })}
          >
            <Text key={user.id} style={[styles.tableText, { fontSize: 20 }]}>
              {user.NamaDokumen}
            </Text>
          </TouchableOpacity>,
          // renderOpsiIcons()
          <View style={styles.opsiContainer}>
          <TouchableOpacity
            onPress={() => [[{ toggleDropdown }, console.log("Opsi titik-tiga")]]}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
          ,
        ])
      );
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  const tableHead = ["Nama Folder", "Aksi"];
  const UserList = () => {
    const addUsers = () => {};
  };

  function renderOpsiIcons() {
    return (
      <View style={styles.opsiContainer}>
        <TouchableOpacity
          onPress={() => [[{ toggleDropdown }, console.log("Opsi titik-tiga")]]}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderOpsiIcons(){
    {isOpen && (
      <View style={styles.dropdownContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleSelectOption(option)}
          >
            <Text style={styles.dropdownOption}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}

    <Text style={styles.selectedOptionText}>
      {selectedOption !== '' ? `Selected: ${selectedOption}` : 'Select an option'}
    </Text>
  }

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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "absolute", top: 0 }}>
        <Header />
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.boldText]}>
          Manajemen Berkas
        </Text>
      </View>
      <View style={styles.card2}>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2, styles.bottomLine]}>Data Arsip</Text>
        </View>
        <ScrollView>
          <Table borderStyle={{ borderWidth: 1, borderColor: "white" }}>
            <UserList />
            <Row
              data={tableHead}
              flexArr={[4, 1]}
              style={[styles.header, styles.boldText]}
              textStyle={[styles.text, styles.boldText, { fontSize: 20 }]}
            />

            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                flexArr={[4, 1]}
                style={[
                  styles.row,
                  index % 2 && { backgroundColor: "#e1fcc5" },
                ]}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
      <View style={styles.row}>{renderOpsiModal()}</View>

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

export default ManajemenBerkas;

const styles = StyleSheet.create({
  //ModalOpsi
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // optionButton: {
  //   backgroundColor: 'white',
  //   padding: 15,
  //   borderTopWidth: 1,
  //   borderTopColor: 'lightgray',
  // },
  // optionText: {
  //   fontSize: 16,
  //   color: 'black',
  // },
  // cancelButton: {
  //   backgroundColor: 'white',
  //   padding: 15,
  //   marginTop: 10,
  // },
  // cancelButtonText: {
  //   fontSize: 16,
  //   color: 'red',
  //   textAlign: 'center',
  // },
  //endModalOpsi

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
    flexDirection: "row",
    alignItems: "center",
  },
  searchButtonText: {
    color: "black",
    textAlign: "left",
  },
  header: {
    height: 50,
    backgroundColor: "#A6D17A",
  },
  text: {
    textAlign: "center",
    fontWeight: "300",
  },
  boldText: {
    fontWeight: "bold",
  },
  dataWrapper: {
    marginTop: -1,
  },
  opsiContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
    textAlign: "center",
  },
});
