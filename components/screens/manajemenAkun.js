import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  SafeAreaView,
  Pressable,ScrollView
} from "react-native";
import { AntDesign ,MaterialCommunityIcons ,FontAwesome} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


import { Table, Row } from 'react-native-table-component';
import Header from "../partials/header";
import Navbar from "../partials/navbar";

const ManajemenAkun = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState('user');
  const [role, setrole] = useState("");

  const tableHead = ['Nama','Role', 'Aksi'];
  const tableData = [
    [<TouchableOpacity onPress={() => console.log('Akun 1')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>Agus</Text>
    </TouchableOpacity>,<Text style={[styles.tableText, { fontSize: 20 }]}>Admin</Text>, renderOpsiIcons()],
    [<TouchableOpacity onPress={() => console.log('Akun 2')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>Sunar</Text>
    </TouchableOpacity>,<Text style={[styles.tableText, { fontSize: 20 }]}>Petugas</Text>, renderOpsiIcons()],
    [<TouchableOpacity onPress={() => console.log('Akun 3')}>
      <Text style={[styles.tableText, { fontSize: 20 }]}>Yo</Text>
    </TouchableOpacity>, <Text style={[styles.tableText, { fontSize: 20 }]}>Admin</Text>,renderOpsiIcons()],
    // tambahkan data lainnya di sini sesuai kebutuhan
  ];

  function renderOpsiIcons() {
    return (
      <View style={styles.opsiContainer}>
        <TouchableOpacity style={[styles.opsiButton, styles.greenButton]}>
          <MaterialCommunityIcons
            name="pencil"
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
    console.log("Username:", username);
    console.log("Nama Lengkap:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);

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
        <Text style={styles.cardTitle}>Manajemen Akun</Text>
      </LinearGradient>
      <View style={styles.card2}>
      <ScrollView>
        <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
          <Row data={tableHead} flexArr={[4,2, 1.3]} style={[styles.header, styles.boldText]} textStyle={[styles.text, styles.boldText, { fontSize: 20 }]} />
          {tableData.map((rowData, index,columnData) => (
            <Row
              key={index}
              data={rowData}flexArr={[4, 2,1.3]}
              
              style={[styles.row, index % 2 && { backgroundColor: '#e1fcc5' }]}
              textStyle={styles.text}
            />
          ))}
        </Table>
        </ScrollView>
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
                    Tambah Akun
                  </Text>
                </View>
                <View style={styles.styletitle}>
                  <View style={styles.styletitle2}>
                    <Text style={styles.titleform}>Nama User</Text>
                    <TextInput
                      style={[styles.inputName]}
                      placeholder="Username"
                      onChangeText={(text) => setUsername(text)}
                    />
                  </View>

                  <View style={styles.styletitle2}>
                    <Text style={styles.titleform}>Nama Lengkap</Text>
                    <TextInput
                      style={styles.inputName}
                      placeholder="Nama Lengkap"
                      onChangeText={(text) => setFullName(text)}
                    />
                  </View>
                </View>
                <Text style={styles.titleform}>Nomor HP</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                />

                <Text style={styles.titleform}>Kata Sandi</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Katak sandi"
                  onChangeText={(text) => setPassword(text)}
                />

                <View style={styles.styletitle3}>
                  <View style={styles.styletitle2}>
                    <Text style={styles.titleform}>Role</Text>
                    <DropDownPicker
                      style={styles.inputRole}
                      items={[
                        { label: "User", value: "user" },
                        { label: "Admin", value: "admin" },
                      ]}
                      defaultValue={role}
                      placeholder="Role"
                      containerStyle={{ height: 40, width: 200 }}
                      onChangeItem={(item) => setrole(item.value)}
                    />
                  </View>

                  <View style={styles.styletitle2}>
                    <Text style={styles.titleformFoto}>Foto</Text>
                    <TextInput style={styles.inputFile} placeholder="Pilih" />
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
        <Navbar whichPage="userList" />
      </View>
    </SafeAreaView>
  );
};

export default ManajemenAkun;

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
    height: 504,
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
  input: {
    width: 319,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  inputName: {
    width: 153,
    height: 34,
    marginLeft: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  inputRole: {
    width: 153,
    height: 34,
    marginLeft: 16,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#F6F6F6",
    borderRadius: 8,
  },
  inputFile: {
    width: 135,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
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
  titleformFoto: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 0,
    marginLeft: 0,
    color: "#6EAD3B",
    height: 30,
    flexDirection: "column",
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
    padding: 20,
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
    borderRadius: 10,
    padding: 16,
    marginBottom: 5,
    marginTop: 20,
    height: 450,
    width: 354,
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
    flex:1,
  },
  cardTitle3: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#A19797",
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
    // borderBottomColor: "#6EAD3B",
    borderBottomWidth: 1,
  
  },
  bottomLineprimary: {
    borderBottomColor: "#A19797",
    borderBottomWidth: 1,
    flexDirection:'row',
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
  header: {
    height: 50,
    backgroundColor: '#A6D17A',},
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
