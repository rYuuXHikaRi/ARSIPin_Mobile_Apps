import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  StatusBar as StatBar,
  Button
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons ,FontAwesome,Feather} from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';
import axios from "axios";


//local
import Header from "../partials/header";
import Navbar from "../partials/navbar";
import { getListDocApi, downloadDocApi, addFile, DeleteArsipFileName } from "../middleware/api";

const DetailBerkas = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [NamaDokumen, setNamaDokumen] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [Tahun, setTahun] = useState("");
  const [NamaDesa, setNamaDesa] = useState("");
  const [LokasiPenyimpanan, setLokasiPenyimpanan] = useState("");
  const [namafile, setnamafile] = useState("");
  const [fileDetail, setFileDetail] = useState([]);
  const [FileNameToDelete, setFileNameToDelete] = useState(null);
  const [showWebView, setShowWebView] = useState(false);
  const [isThereNewData,setIsThereNewData]= useState(false);
  const { arsip } = route.params;
  const folderName= arsip.NamaDokumen +'-'+arsip.LokasiPenyimpanan;
  const [files, setFiles] = useState([]);
  const idtodelete = arsip.id;
  const [modalDelete, setModalDelete] = useState(false);
  const [FileIdToDelete, setFileIdToDelete] = useState(null);
  const [isThereNewData, setIsThereNewData] = useState(true);

  console.log(folderName)

  useEffect(() => {
    fetchDataFromServer();
  }, [isThereNewData]);

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


  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        type: "application/pdf", // Adjust the file type based on your requirements
      });

      console.log(result);
      if (result.type === "success") {
        setSelectedFile([result.uri]); // Store the URI in the selectedFiles state
        const file = {
          uri: result.uri,
          name: result.name,
          type: result.mimeType,
        };
        setFiles(file);
        console.log(file);
      } else if (result.type === "cancel") {
        console.log("User cancelled document picker");
      }
    } catch (error) {
      console.log("DocumentPicker Error: ", error);
    }
  };


  const handleCreate = async () => {
    // commented code in here moved to /dump/unusedCode -> manajemenBerkas - 02
    console.log(files);
    const formData = new FormData();
    formData.append("file", files);
    console.log(formData)

    // commented code in here moved to /dump/unusedCode -> manajemenBerkas - 03

    try {
      // Kirim data ke server menggunakan axios.post dengan FormData sebagai payload
      console.log(formData);
      const config = {
        body: formData,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // commented code in here moved to /dump/unusedCode -> manajemenBerkas - 04

      let response = await fetch(addFile+'/'+arsip.id, config);
      

      console.log("Data created successfully:", response.data);
      // Reset input fields if needed
      console.log("berhasil");
      setModalVisible(false);
      setFiles([]);
      setIsThereNewData(true);
    } catch (error) {
      console.error("Error creating data:", error);
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
                  handleDelete(arsip.id,item.filename);
                }}
              >
                <Feather name="trash" size={30} color="black" />
              </TouchableOpacity>
    </View>
  </View>
  );
  
  console.log(fileDetail);
  // Unused code in here was moved to /dump/unusedCode -> detailBerkas - 01

  const DeleteArsipFile = () => {
    cek = DeleteArsipFileName + `/${FileIdToDelete}`+ `/${FileNameToDelete}`;
    console.log(cek)
    console.log(FileIdToDelete);
    axios
      .delete(DeleteArsipFileName + `/${FileIdToDelete}`+ `/${FileNameToDelete}`)
      .then((response) => {
        // Proses respons API jika diperlukan
        console.log("Arsip deleted successfully");
        setModalDelete(false); // Sembunyikan modal setelah penghapusan berhasil
        setIsThereNewData(true);
      })
      .catch((error) => {
        console.error("Error deleting File:", error);
      });
  };

  const handleDelete = (FileId, FileName) => {
    console.log("Delete user with ID:", FileId);
    setFileIdToDelete(FileId);
    setFileNameToDelete(FileName);
    setModalDelete(true);
  };


  const renderModalDelete = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDelete}
        onRequestClose={() => setModalDelete(false)}
      >
        <View style={styles.modalContainerdelete}>
          <View style={styles.modalContentdelete}>
            <Text style={styles.modalTextdelete}>
              Apakah Anda Yakin Ingin Menghapus Dokumen :
              <Text style={styles.modalTextdeleteName}>{FileNameToDelete}</Text>
            </Text>
            <View style={styles.buttonContainerdelete}>
              <TouchableOpacity onPress={() => setModalDelete(false)}>
                <View style={styles.buttonModalDelClose}>
                  <Text style={styles.cancelButtonmodaldelete}>Tutup</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={DeleteArsipFile}>
                <View style={styles.buttonModalDel}>
                  <Text style={styles.confirmButtonmodaldelete}>Hapus</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

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
      

              <View style={styles.styletitle4}>
                <Text style={styles.titleformupload}>Upload File   </Text>
                <Button title="Pilih File"onPress={handleFilePick} color="#6EAD3B" style={styles.buttonplh} />
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
     
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header pageType="detailPage" namePage="Detail Arsip" style={{position: 'absolute', top: Platform.OS === 'android' ? StatBar.currentHeight : 0 }}/>

      <View style={{ flex: 1, padding: 16, backgroundColor: '#F0E5E5' }}>
        <View style={styles.card2}>
          <View style={styles.row}>
            <Text style={[styles.cardTitle2, styles.bottomLine]}>{arsip.NamaDokumen}</Text>
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
        <View>{renderModalDelete()}</View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
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
      </View>
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
};

export default DetailBerkas;

const styles = StyleSheet.create({
  //Modal style Delete
  modalContainerdelete: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContentdelete: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "90%",
    height: "23%",
  },
  modalTextdelete: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "450",
    textAlign: "center",
  },
  buttonContainerdelete: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelButtonmodaldelete: {
    color: "#6EAD3B",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmButtonmodaldelete: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  modalTextdeleteName: {
    color: "#6EAD3B",
  },
  buttonModalDel: {
    backgroundColor: "#6EAD3B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#6EAD3B",
    marginTop: 20,
    width: 150,
  },
  buttonModalDelClose: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#6EAD3B",
    marginTop: 20,
    width: 150,
  },
  //end modal delete
  
  //Modal Style
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 354,
    height: 100,
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
    backgroundColor: 'white',
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
