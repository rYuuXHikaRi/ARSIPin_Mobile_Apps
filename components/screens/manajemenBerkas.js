import React, { useState, memo  } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  FlatList,
  Platform,
  StatusBar as StatBar
} from "react-native";

import {
  AntDesign,
  Feather,
} from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import { MenuProvider, MenuOption } from "react-native-popup-menu";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../partials/header";
import Navbar from "../partials/navbar";
import PopUpMenu from "../partials/popUpMenu/popUpMenu";
import ModalEditDoc from "../partials/modals/modalEditDoc";
import { dataArsipsApi, storeArsip } from "../middleware/apiEndpoint"; // API ENDPOINT


const ManajemenBerkas = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [namadokumen, setnamadokumen] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [tahun, settahun] = useState("");
  const [namadesa, setnamadesa] = useState("");
  const [lokasipenyimpanan, setlokasipenyimpanan] = useState("");
  const [namafile, setnamafile] = useState("");
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);
  const [archives, setArchives] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [NamaDokumen, setNamaDokumen] = useState("");
  const [Keterangan, setKeterangan] = useState("");
  const [Tahun, setTahun] = useState("");
  const [NamaDesa, setNamaDesa] = useState("");
  const [LokasiPenyimpanan, setLokasiPenyimpanan] = useState("");
  const [NamaFile, setNamaFile] = useState("");
  const [showPopover, setShowPopover] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState([]);
  const [files, setFiles] = useState([]);
  const [curDocSelect, setCurDocSelect] = useState(null);
  const [isThereNewData, setIsThereNewData] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredArchives, setFilteredArchives] = useState([]);

  useEffect(() => {
    fetchArchives();
  }, [isThereNewData]);

  const fetchArchives = async () => {
    try {
      const response = await fetch(dataArsipsApi);
      const data = await response.json();
      setArchives(data);
      console.log('fetched')
      setIsThereNewData(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(searchKeyword);

  const searchArchives = (query) => {
    setSearchKeyword(query);
    const filteringData = archives.filter(
      (item) => {
        return item.NamaDokumen.toLowerCase().includes(query.toLowerCase());
      }
    )
    setFilteredArchives(filteringData);
    console.log(filteredArchives);
  }
  
  // commented code in here moved to /dump/unusedCode -> manajemenBerkas - 01

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        type: "application/pdf", // Adjust the file type based on your requirements
      });

      console.log(result);
      if (result.type === "success") {
        setSelectedFiles([result.uri]); // Store the URI in the selectedFiles state
        const file = {
          uri: result.uri,
          name: result.name,
          type: result.mimeType,
        };
        setFiles(file);
        console.log(files);
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
    formData.append("NamaDokumen", NamaDokumen);
    formData.append("Keterangan", Keterangan);
    formData.append("Tahun", Tahun);
    formData.append("NamaDesa", NamaDesa);
    formData.append("LokasiPenyimpanan", LokasiPenyimpanan);
    $folderName = NamaDokumen + "-" + LokasiPenyimpanan;
    formData.append("NamaFile", $folderName);
    formData.append("file", files);

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

      let response = await fetch(storeArsip, config);
      

      console.log("Data created successfully:", response.data);
      // Reset input fields if needed
      console.log("berhasil");
      setModalVisible(false);
      setNamaDesa('');
      setNamaDokumen('');
      setTahun('');
      setLokasiPenyimpanan('');
      setKeterangan('');
      setIsThereNewData(true);
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const tableHead = ["Nama Folder", "Aksi"];

  function renderOpsiIcons() {
 
   
    return (
      <View style={styles.opsiContainer}>
        {/*commented code in here moved to /dump/unusedCode -> manajemenBerkas - 05 */ }

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
                  // console.log("Pencil button pressed");
                setShowPopover(false)
                {handleEditModal()}
                }}
              >
                <Feather name="edit" size={30} color="black" />
                <Text style={styles.opsiText}>Edit</Text>
                <View>{renderOpsiModalEdit()}</View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opsiButton}
                onPress={() => {
                  // Logika ketika tombol "Eye" ditekan
                  console.log(selectedArchive);
                  navigation.navigate("detailberkas", { arsip: curDocSelect })
                }}
              >
                <Feather name="eye" size={30} color="black" />
                <Text style={styles.opsiText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.opsiButton}
                onPress={() => {
                  // Logika ketika tombol "Trash" ditekan
                  moveconsole.log("Trash button pressed");
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
  const catchArchiveId = (archiveId) => {
    console.log("Catch archive with ID:", archiveId);
    const archive = archives.find((archive) => archive.id === archiveId);
    setSelectedArchive(archive);
    setShowPopover(true);
    renderOpsiIcons();
    console.log("yey");
  };

  const moveToDetailBerkas = (archiveId) => {
    console.log(archiveId);
    const archive = archives.find((archive) => archive.id === archiveId);
    setSelectedArchive(archive);
    navigation.navigate("detailberkas", { archive })

  };
  const handleEditModal = () => {
    setModalVisibleEdit(true);
    console.log('cek modal edit')
  } 

  const renderArchiveItem = ({ item }) => (
    <View style={styles.userItem}>
      <TouchableOpacity 
      style={{ flex:2 }}
      onPress={()=>moveToDetailBerkas(item.id)}>
        <Text style={styles.userName}>{item.NamaDokumen}</Text>
      </TouchableOpacity>
      {/*commented code in here moved to /dump/unusedCode -> manajemenBerkas - 06 */ }
      
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => catchArchiveId(item.id)}
          
        >

          {/*commented code in here moved to /dump/unusedCode -> manajemenBerkas - 07 */ }

          <PopUpMenu>
            <MenuOption style={{backgroundColor: 'green', borderRadius: 8}} onSelect={() => {setCurDocSelect(item); setModalVisibleEdit(true);}}>
              <Feather name="edit" size={20} color="white" />
            </MenuOption>
            <MenuOption style={{backgroundColor: 'green', borderRadius: 8}} onSelect={() => {console.log("Moved to detail document page at " + item.NamaDokumen + " document"); navigation.navigate('detailberkas', {arsip: item})}}>
              <Feather name="eye" size={20} color="white" />
            </MenuOption>
            <MenuOption style={{backgroundColor: 'orange', borderRadius: 8}}>
              <Feather name="trash" size={20} color="white" />
            </MenuOption>
          </PopUpMenu>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  //const MemoizedRenderUserItem = memo(RenderUserItem);

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

  //commented code in here moved to /dump/unusedCode -> manajemenBerkas - 08
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Modal for Edit Document */}
      <ModalEditDoc isVisible={modalVisibleEdit}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
            style={[styles.buttonX, styles.buttonClose]}
            onPress={() => {setCurDocSelect(null); setModalVisibleEdit(!modalVisibleEdit);}}
            >
            <Text style={styles.X}>X</Text>
            </TouchableOpacity>

            <View style={styles.Headtitle}>
              <Text style={[styles.bottomLine, styles.titleModal]}>Edit Arsip</Text>
            </View>

            <View>
              <View style={styles.styletitle2}>
              <Text style={styles.titleform}>Nama Dokumen</Text>
              <TextInput
              style={[styles.input]}
              placeholder={curDocSelect !== null ? curDocSelect.NamaDokumen : "Nama Dokumen"}
              value={NamaDokumen}
              onChangeText={(text) => setNamaDokumen(text)}
              />
              </View>

              <View style={styles.styletitle2}>
              <Text style={styles.titleform}>Keterangan</Text>
              <TextInput
              style={styles.inputketerangan}
              placeholder={curDocSelect !== null ? curDocSelect.Keterangan : "Keterangan"}
              value={Keterangan}
              onChangeText={(text) => setKeterangan(text)}
              />
              </View>
            </View>
            <Text style={styles.titleform}>Tahun</Text>
            <TextInput
              style={styles.input}
              placeholder={curDocSelect !== null ? curDocSelect.Tahun : "Tahun"}
              value={Tahun}
              onChangeText={(text) => setTahun(text)}
            />

            <Text style={styles.titleform}>Nama Desa</Text>
            <TextInput
              style={styles.input}
              placeholder={curDocSelect !== null ? curDocSelect.NamaDesa : "Nama Desa"}
              value={NamaDesa}
              onChangeText={(text) => setNamaDesa(text)}
            />

            <View>
              <View style={styles.styletitle2}>
              <Text style={styles.titleform}>Lokasi Penyimpanan</Text>
              <TextInput
              style={styles.input}
              placeholder={curDocSelect !== null ? curDocSelect.LokasiPenyimpanan : "Loker"}
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
              onPress={() => {setCurDocSelect(null); handleCreate}}
            >
              <Text style={styles.textStyle}>Simpan</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </ModalEditDoc>
      <Header style={{position: 'absolute', top: Platform.OS === 'android' ? StatBar.currentHeight : 0 }}/>
      <View style={{ position: 'relative', flex: 1, padding: 16, backgroundColor: '#F0E5E5' }}>
        <LinearGradient
          colors={["#197B40", "#79B33B", "#A6CE39"]}
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

          {/*commented code in here moved to /dump/unusedCode -> manajemenBerkas - 09 */ }

            <MenuProvider style={styles.containertabel}>
              <FlatList
                data={searchKeyword === '' ? archives : filteredArchives}
                renderItem={renderArchiveItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Nama Dokumen</Text>
                    <Text style={styles.headerText}>Aksi</Text>
                  </View>
                }

              />
            </MenuProvider>
        </View>

        <View style={styles.row}>
          <LinearGradient
            colors={["#90C13B", "#7CB53C", "#378D3F"]}
            start={[0, 0.5]}
            end={[1, 0.5]}
            style={styles.button}
          >
            <View>{renderOpsiModal()}</View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>+ Tambah Arsip Baru</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View
          style={{ position: "absolute", bottom: 0, backgroundColor: "#F0E5E5" }}
        >
          <View
            style={[
              styles.row,
              { paddingLeft: 18, paddingRight: 18, marginBottom: 20 },
            ]}
          >
            <View style={styles.searchButton}>
              <AntDesign name="search1" size={20} color="black" />
              <TextInput
                placeholder="Cari data..."
                style={styles.searchButtonText}
                onChangeText={(text) => {searchArchives(text)}}
                value={searchKeyword}
              />
            </View>
          </View>
          <Navbar whichPage="arsip" />
        </View>
      </View>
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
};

export default ManajemenBerkas;

const styles = StyleSheet.create({
  //TabelContent:
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
  },
  userName: {
    flex: 2,
    fontSize: 18,
    fontWeight: "bold",
  },
  userRole: {
    flex: 2,
    fontSize: 16,
    color: "#888",
    paddingLeft: 80,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  editButton: {
    marginRight: 1,
    backgroundColor: "#A6D17A",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#197B40",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
    width: 35,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
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
    backgroundColor: 'white',
  },
  card: {
    borderRadius: 8,
    paddingLeft: 12,
    height: 43,

    justifyContent: "center",
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

    justifyContent: "center",
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
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

    paddingLeft: 7,
  },
  searchButtonText: {
    color: "black",
    fontWeight: "400",
    textAlign: "left",
  },
  tableText: {
    textAlign: "center",
  },
  opsiContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  opsiButton: {
    flexDirection: "row",
    alignItems: "center",
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
