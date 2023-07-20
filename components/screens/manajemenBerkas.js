import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,ScrollView,Button
} from "react-native";
import { AntDesign, MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import { Table, Row } from 'react-native-table-component';
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from 'expo-linear-gradient';
import AndroidSafeView from "../AndroidSafeView";
import Header from "../partials/header";
import Navbar from "../partials/navbar";
import { useEffect } from "react";
import axios from "axios";
import * as DocumentPicker from 'expo-document-picker';



const ManajemenBerkas = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [namadokumen, setnamadokumen] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [tahun, settahun] = useState("");
  const [namadesa, setnamadesa] = useState("");
  const [lokasipenyimpanan, setlokasipenyimpanan] = useState("");
  const [namafile, setnamafile] = useState("");
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);
  const [rowData,setRowData]= useState([]);
  const [NamaDokumen, setNamaDokumen] = useState('');
  const [Keterangan, setKeterangan] = useState('');
  const [Tahun, setTahun] = useState('');
  const [NamaDesa, setNamaDesa] = useState('');
  const [LokasiPenyimpanan, setLokasiPenyimpanan] = useState('');
  const [NamaFile, setNamaFile] = useState('');
  const [showPopover,setShowPopover] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [file, setFile] = useState([]);
  
  
  

  useEffect(() => {
    const fetchUsers = async () => {

      try {
          const response = await fetch('http://192.168.0.249:8000/api/arsips');
          const data = await response.json();  
          setUsers(data);
          tableData.splice(0,tableData.length);
  
      } catch (error) {
          console.log(error);
      }


  };
    fetchUsers();
    addUsers();
  }, []);




const addUsers = () => {
  users.map((user) => (
    tableData.push([<TouchableOpacity onPress={() => navigation.navigate('detailberkas',{user})}>
    <Text key={user.id} style={[styles.tableText, { fontSize: 20 }]}>{user.NamaDokumen}</Text>
    </TouchableOpacity>,renderOpsiIcons()])
 ))

}

const handleFilePick = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      type: 'application/pdf', // Adjust the file type based on your requirements
    });

    if (result.type === 'success') {
      setSelectedFiles([result.uri]); // Store the URI in the selectedFiles state
      console.log(result.uri);
      const files = {
        uri: result.uri,
        name: result.name,
        type: result.type,
      };

      setFile(files);

      // Append the file to the FormData object
      

    } else if (result.type === 'cancel') {
      console.log('User cancelled document picker');
    }
  } catch (error) {
    console.log('DocumentPicker Error: ', error);
  }
};

const handleCreate = async () => {
 
  // const data = {
  //   NamaDokumen: NamaDokumen,
  //   Keterangan: Keterangan,
  //   Tahun: Tahun,
  //   NamaDesa: NamaDesa,
  //   LokasiPenyimpanan: LokasiPenyimpanan,
  //   NamaFile : "File.txt"
  // };
  const formData = new FormData();
  formData.append('NamaDokumen', NamaDokumen);
  formData.append('Keterangan', Keterangan);
  formData.append('Tahun', Tahun);
  formData.append('NamaDesa', NamaDesa);
  formData.append('LokasiPenyimpanan', LokasiPenyimpanan);
  $folderName = NamaDokumen +'-'+ LokasiPenyimpanan;
  formData.append('NamaFile', $folderName);
  formData.append('file',file);


  try {
    // Kirim data ke server menggunakan axios.post dengan FormData sebagai payload
    console.log(formData)
    const response = await axios.post('http://192.168.0.249:8000/api/store', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Pastikan Anda mengatur Content-Type sebagai 'multipart/form-data'
      }
    });
  
    console.log('Data created successfully:', response.data);
    // Reset input fields if needed
    console.log('berhasil')
    setModalVisible(false);
  } catch (error) {
    console.error('Error creating data:', error);
  }
};



  
  const tableHead = ['Nama Folder', 'Aksi'];


  function renderOpsiIcons() {
    return (
      <View style={styles.opsiContainer}>
        <TouchableOpacity onPress={() => setShowPopover(true)}>
          <MaterialCommunityIcons name="dots-vertical" size={30} color="black" />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPopover}
          onRequestClose={() => setShowPopover(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView2}>
              <TouchableOpacity
                style={styles.opsiButton}
                onPress={() => {
                  // Logika ketika tombol "Pencil" ditekan
                  console.log('Pencil button pressed');
                  setShowPopover(false);
                }}
              >
                <Feather name="edit" size={30} color="black" />
                <Text style={styles.opsiText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opsiButton}
                onPress={() => {
                  // Logika ketika tombol "Eye" ditekan
                  console.log('Eye button pressed');
                  setShowPopover(false);
                }}
              >
                <Feather name="eye" size={30} color="black" />
                <Text style={styles.opsiText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opsiButton}
                onPress={() => {
                  // Logika ketika tombol "Trash" ditekan
                  console.log('Trash button pressed');
                  setShowPopover(false);
                }}
              >
                <Feather name="trash" size={30} color="black" />
                <Text style={styles.opsiText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonX, styles.buttonClose]}
                onPress={() => setShowPopover(false)}
              >
                <Text style={styles.X}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
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
                  value={NamaDokumen}
                  onChangeText={(text) => setNamaDokumen(text)}
                />
              </View>

              <View style={styles.styletitle2}>
                <Text style={styles.titleform}>Keterangan</Text>
                <TextInput
                  style={styles.inputketerangan}
                  placeholder="Keterangan"
                  value={Keterangan}
                  onChangeText={(text) => setKeterangan(text)}
                />
              </View>
            </View>
            <Text style={styles.titleform}>Tahun</Text>
            <TextInput
              style={styles.input}
              placeholder="tahun"
              value={Tahun}
              onChangeText={(text) => setTahun(text)}
            />

            <Text style={styles.titleform}>Nama Desa</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Desa"
              value={NamaDesa}
              onChangeText={(text) => setNamaDesa(text)}
            />

            <View>
              <View style={styles.styletitle2}>
                <Text style={styles.titleform}>Lokasi Penyimpanan</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Loker"
                  value={LokasiPenyimpanan}
                  onChangeText={(text) => setLokasiPenyimpanan(text)}
                />
              </View>

              <View style={styles.styletitle4}>
                <Text style={styles.titleformupload}>Upload File</Text>
                <Button title="Pilih File" onPress={handleFilePick} />
                {selectedFiles.map((file, index) => (
                  <Text key={index}>{file.name}</Text>
                ))}
              </View>
            </View>

            <View style={styles.btnsave}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSave]}
                onPress={handleCreate}
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
          <Text style={[styles.cardTitle2, styles.bottomLine]}>Data Arsip</Text>
        </View>
        <ScrollView>
        <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
        
          <Row data={tableHead} flexArr={[4, 1]} style={[styles.header, styles.boldText]} textStyle={[styles.text, styles.boldText, { fontSize: 20 }]} />
       
          
          {tableData.map((rowData, index,) => (
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
  opsiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  opsiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  opsiText: {
    marginLeft: 8,
    fontSize: 16,
  },
  modalView2: {
    width: 350,
    height: 150,
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
});
