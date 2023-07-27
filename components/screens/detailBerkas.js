import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView,
  FlatList
} from "react-native";
import { AntDesign, MaterialCommunityIcons ,FontAwesome,Feather} from '@expo/vector-icons';
import { Table, Row } from 'react-native-table-component';
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from 'expo-linear-gradient';
import AndroidSafeView from "../AndroidSafeView";
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { WebView } from 'react-native-webview';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';

//local
import Header from "../partials/header";
import Navbar from "../partials/navbar";
import { getListDocApi, downloadDocApi } from "../middleware/apiEndpoint";



const DetailBerkas = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [NamaDokumen, setNamaDokumen] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [Tahun, setTahun] = useState("");
  const [NamaDesa, setNamaDesa] = useState("");
  const [LokasiPenyimpanan, setLokasiPenyimpanan] = useState("");
  const [namafile, setnamafile] = useState("");
  const [fileDetail, setFileDetail] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showWebView, setShowWebView] = useState(false);
  const { arsip } = route.params;
  const folderName= arsip.NamaDokumen +'-'+arsip.LokasiPenyimpanan;

  console.log(folderName)

  console.log(arsip);
  console.log('dsfisghdkjsdhkfgsdgdkjvhvkjdsg');

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  // useEffect(() => {
  //   // Lakukan pengambilan data detail file dari endpoint Laravel menggunakan fileId
  //   fetch(`http://192.168.248.249:8000/api/arsips/2`)
  //   .then(response => response.json())
  //   .then(data => {
  //     setFileDetail(data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching user detail:', error);
  //   });
  // }, [arsip.id]);
  const fetchDataFromServer = async () => {
    try {
      const response = await fetch(getListDocApi + `/${arsip.id}`);
      const jsonData = await response.json();
      setFileDetail(jsonData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileDownload = async (filename) => {
    try {
      // Replace 'your-laravel-api-url' with your actual Laravel API URL
      const apiUrl = downloadDocApi + `/${filename}/${arsip.id}`;
  
      const downloadResult = await Linking.openURL(apiUrl);
      if (downloadResult && downloadResult.action === Linking.ACTIONS.OPEN_DOCUMENT) {
        // Get the downloaded file's URI
        const downloadedFileUri = downloadResult.fileUri;

        // Save the file to the device's file manager (downloads folder)
        const destinationUri = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.moveAsync({ from: downloadedFileUri, to: destinationUri });

        console.log('File saved in device download folder.');
      } else {
        console.error('Error downloading file.');
      }
    } catch (error) {
      console.error('Error downloading and saving file:', error);
      // Handle error scenario
    }
  };
  
  

  const handleOpenDocumentPicker = async () => {
    try {
      const documentResult = await DocumentPicker.getDocumentAsync();
      if (documentResult.type === 'success') {
        // Handle the selected file (e.g., trigger download)
        handleFileDownload(documentResult.name);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const renderFileItem = ({ item }) => (
    <View style={styles.userItem}>
    <TouchableOpacity 
    style={{ flex:2 }}
    onPress={() => handleFileDownload(item.filename)}>
      <Text>{item.filename}</Text>
    </TouchableOpacity>
    {/* <Text style={styles.userRole}>{item.Roles == 1 ? "admin" : "user"}</Text> */}
    <View style={styles.actionsContainer}>
    <TouchableOpacity
                style={styles.opsiButton}
                onPress={() => {
                  // Logika ketika tombol "Trash" ditekan
                  moveconsole.log("Trash button pressed");
                  setShowPopover(false);
                }}
              >
                <Feather name="trash" size={30} color="black" />
              </TouchableOpacity>
    </View>
  </View>
  );
  
  console.log(fileDetail);
  // Unused code in here was moved to /dump/unusedCode -> detailBerkas - 01


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
          <Text style={[styles.cardTitle2]}>Nama : {arsip.NamaDokumen}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2]}>Tahun: {arsip.Tahun}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2]}>Desa : {arsip.NamaDesa}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2]}>Lokasi Penyimpanan : {arsip.LokasiPenyimpanan}</Text>
        </View>
        
    
          <View style={styles.containertabel}>
            <FlatList
             data={fileDetail}
             renderItem={renderFileItem}
              keyExtractor={(item) => item.filename}
              ListHeaderComponent={
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>Nama File</Text>
                  <Text style={styles.headerText}>Aksi</Text>
                </View>
              }
            />
          </View>
   
      </View>
      <View style={styles.row}>
        {renderOpsiModal()}
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOpenDocumentPicker()}
        >
          <Text style={styles.buttonText}>+ Tambah Dokumen</Text>
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
  containertabel: {
    flex: 1,
    padding: 16,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  }
});
