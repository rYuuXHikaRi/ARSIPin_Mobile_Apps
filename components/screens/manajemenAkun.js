import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
  Picker,
  FlatList,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from "react";
import Header from "../partials/header";
import Navbar from "../partials/navbar";
import { dataUsersApi, storeUser, destroyUser } from "../middleware/apiEndpoint";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { SvgXml } from 'react-native-svg';
import { loginBg } from '../../assets/img/svgAssets';

const ManajemenAkun = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [UserName, setUserName] = useState("");
  const [NomorHp, setNomorHp] = useState("");
  const [NamaLengkap, setNamaLengkap] = useState("");
  const [password, setpassword] = useState("");
  const [Roles, setRoles] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userNameToDelete, setUserNameToDelete] = useState("");
  const [isThereNewData, setIsThereNewData] = useState(true);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setSelectedImg(result.assets[0].uri);
      }
    } catch (error) {
      console.log("ImagePicker Error: ", error);
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("NamaLengkap", NamaLengkap);
    formData.append("UserName", UserName);
    formData.append("NomorHp", NomorHp);
    formData.append("password", password);
    formData.append("Roles", selectedOption);

    // Jika ada gambar yang dipilih, tambahkan gambar ke FormData
    if (selectedImg != null) {
      if (selectedImg.length > 0) {
        const fileUri = selectedImg[0];
        const fileName = fileUri.split("/").pop();
        formData.append("Foto", {
          uri: fileUri,
          name: fileName,
          type: "image/jpeg", // Ganti sesuai tipe gambar yang diunggah
        });
      }
    }

    try {
      // Kirim data ke API menggunakan axios.post dengan FormData sebagai payload
      const response = await axios.post(storeUser, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Jangan lupa atur header untuk FormData
          },
        }
      );

      console.log("Response from API:", response.data);
      // Lakukan apa pun yang perlu Anda lakukan setelah berhasil menyimpan data
      // Misalnya, tampilkan pesan sukses atau perbarui tampilan data di aplikasi Anda
      setModalVisible(false);
    } catch (error) {
      // Jika request gagal, Anda dapat menangani error di sini
      console.log("Error:", error);
      // Lakukan apa pun yang perlu Anda lakukan jika ada kesalahan dalam menyimpan data
      // Misalnya, tampilkan pesan error kepada pengguna atau log pesan error
    }
  };

  const options = ["Admin", "User"];

  const handleSelectOption = (option) => {
    if (option === "Admin") {
      setSelectedOption(1);
    } else if (option === "User") {
      setSelectedOption(2);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchUsers();
  }, [isThereNewData]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(dataUsersApi);
      const data = await response.json();
      setUsers(data);
      setIsThereNewData(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleEdit = (userId) => {
    console.log("Edit user with ID:", userId);
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
    setModalVisibleEdit(true);
    console.log("yey");
  };

  const handleDelete = (userId, UserNamaLengkap) => {
    console.log("Delete user with ID:", userId);
    setUserIdToDelete(userId);
    setUserNameToDelete(UserNamaLengkap);
    setModalDelete(true);
  };

  const DeleteUser = () => {
    console.log(userIdToDelete)
    axios
    .delete(destroyUser + `/${userIdToDelete}`)
    .then((response) => {
      // Proses respons API jika diperlukan
      console.log('User deleted successfully');
      setModalDelete(false); // Sembunyikan modal setelah penghapusan berhasil
      setIsThereNewData(true);
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
  }

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
              Apakah Anda Yakin Ingin Menghapus User :{" "}
              <Text style={styles.modalTextdeleteName}>{userNameToDelete}</Text>
            </Text>
            <View style={styles.buttonContainerdelete}>
              <TouchableOpacity onPress={() => setModalDelete(false)}>
                <View style={styles.buttonModalDelClose}>
                <Text style={styles.cancelButtonmodaldelete}>Tutup</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={DeleteUser}>
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

  const renderOpsiModalAdd = () => {
    return (
      <Modal
        animationType="fade"
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
                  value={UserName}
                  onChangeText={(text) => setUserName(text)}
                />
              </View>

              <View style={styles.styletitle2}>
                <Text style={styles.titleform}>Nama Lengkap</Text>
                <TextInput
                  style={styles.inputName}
                  placeholder="Nama Lengkap"
                  value={NamaLengkap}
                  onChangeText={(text) => setNamaLengkap(text)}
                />
              </View>
            </View>
            <Text style={styles.titleform}>Nomor HP</Text>
            <TextInput
              style={styles.input}
              placeholder="Nomor HP"
              value={NomorHp}
              onChangeText={(text) => setNomorHp(text)}
            />

            <Text style={styles.titleform}>Kata Sandi</Text>
            <TextInput
              style={styles.input}
              placeholder="Kata Sandi"
              value={password}
              onChangeText={(text) => setpassword(text)}
            />

            <View style={styles.styletitle3}>
              <View style={styles.styletitle2}>
                <Text style={styles.titleform}>Role</Text>
                <View style={styles.inputRole}>
                  <TouchableOpacity onPress={toggleDropdown}>
                    <Text
                      style={{
                        paddingHorizontal: 0,
                        backgroundColor: "#F6F6F6",
                        paddingVertical: 10,
                        marginLeft:2,
                      }}
                    >
                      {selectedOption !== ""
                        ? selectedOption
                        : "Plih Role          "}
                      <Feather name="chevron-down" marginLeft={10} paddingLeft={10} size={20} color={"black"} />
                    </Text>
                  </TouchableOpacity>

                  {isOpen && (
                    <View style={{ marginTop: 3 }}>
                      {options.map((option) => (
                        <TouchableOpacity
                          key={option}
                          onPress={() => handleSelectOption(option)}
                        >
                          <Text style={styles.OpsionDropdown}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.styletitle4}>
                <Text style={styles.titleformFoto}>Foto</Text>
                <TouchableOpacity
                  style={styles.inputFile}
                  placeholder="Pilih"
                  onPress={pickImage}
                >
                  <Text style={styles.inputFilestyle}>Pilih Foto</Text>
                </TouchableOpacity>
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

  const renderOpsiModalEdit = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleEdit}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleEdit(!modalVisibleEdit);
        }}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalViewEdit}>
            <TouchableOpacity
              style={[styles.buttonX, styles.buttonClose]}
              onPress={() => setModalVisibleEdit(!modalVisibleEdit)}
            >
              <Text style={styles.X}>X</Text>
            </TouchableOpacity>

            <View style={styles.Headtitle}>
              <Text style={[styles.bottomLine, styles.titleModal]}>
                Edit Data Akun
              </Text>
            </View>
            {selectedUser && (
              <>
                <View style={styles.styletitle}>
                  <View style={styles.styletitle2}>
                    <Text style={styles.titleform}>Nama User</Text>
                    <TextInput
                      style={[styles.inputName]}
                      placeholder={selectedUser.NamaLengkap}
                      value={UserName}
                      onChangeText={(text) => setUserName(text)}
                    />
                  </View>

                  <View style={styles.styletitle2}>
                    <Text style={styles.titleform}>Nama Lengkap</Text>
                    <TextInput
                      style={styles.inputName}
                      placeholder={selectedUser.UserName}
                      value={NamaLengkap}
                      onChangeText={(text) => setNamaLengkap(text)}
                    />
                  </View>
                </View>

                <Text style={styles.titleform}>Nomor HP</Text>
                <TextInput
                  style={styles.input}
                  placeholder={selectedUser.NomorHp}
                  value={NomorHp}
                  onChangeText={(text) => setNomorHp(text)}
                />

                <View style={styles.styletitle3}>
                  <View style={styles.styletitle2}>
                    <Text style={styles.titleform}>Role</Text>
                    <View style={styles.inputRoleedit}>
                      <Text
                        style={{
                          paddingHorizontal: 10,
                          backgroundColor: "#DDDADA",
                          paddingVertical: 10,
                        }}
                      >
                        {selectedUser.Roles == 1 ? "admin" : "user"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.styletitle4}>
                    <Text style={styles.titleformFoto}>Foto</Text>
                    <TouchableOpacity
                      style={styles.inputFile}
                      placeholder="Pilih"
                      onPress={pickImage}
                    >
                      <Text style={styles.inputFilestyle}>Pilih Foto</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            <View style={styles.btnsaveEdit}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSaveEdit]}
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

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.NamaLengkap}</Text>
      <Text style={styles.userRole}>{item.Roles == 1 ? "admin" : "user"}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item.id)}
        >
          <View style={styles.row}>{renderOpsiModalEdit()}</View>
          {/* <Text style={[styles.actionText]}>Edit</Text> */}
          <MaterialCommunityIcons name="pencil" size={20} color="#197B40" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id, item.NamaLengkap)}
        >
          {/* <Text style={styles.actionText}>Delete</Text> */}
          <View>{renderModalDelete()}</View>
          <FontAwesome name="trash" size={25} color="#A6D17A" />
        </TouchableOpacity>
      </View>
    </View>
  );

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
        colors={["#197B40", "#79B33B", "#A6CE39"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={[styles.card]}
      >
        <Text style={styles.cardTitle}>Manajemen Akun</Text>
      </LinearGradient>
      <View style={styles.card2}>
        <View style={styles.containertabel}>
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Nama Lengkap</Text>
                <Text style={styles.headerText}>Roles</Text>
                <Text style={styles.headerText}>Aksi</Text>
              </View>
            }
          />
        </View>
      </View>

      <View style={styles.row}>
        <LinearGradient
          colors={["#90C13B", "#7CB53C", "#378D3F"]}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={styles.button}
        >
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>+ Tambah Akun Baru</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <TouchableOpacity style={styles.button}>
        <View style={styles.row}>{renderOpsiModalAdd()}</View>
      </TouchableOpacity>
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
    flex: 3,
    fontSize: 18,
    fontWeight: "bold",
  },
  userRole: {
    flex: 2,
    fontSize: 16,
    color: "#888",
    paddingLeft: 30,
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
    width: 35,
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
    height:"20%",
  },
  modalTextdelete: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainerdelete: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelButtonmodaldelete: {
    color: '#6EAD3B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButtonmodaldelete: {
    fontSize: 18,
    color: "white",
  },
  modalTextdeleteName:{
    color:'#6EAD3B',
  },
  buttonModalDel: {
    backgroundColor: '#6EAD3B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6EAD3B',
    marginTop:20,
  },
  buttonModalDelClose: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6EAD3B',
    marginTop:20,
  },
  //end modal delete

  //Modal Style
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
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
  modalViewEdit: {
    width: 354,
    height: 384,
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
    width: 109,
    height: 43,
    backgroundColor: "#6EAD3B",
  },
  btnsave: {
    width: 109,
    height: 73,
    marginLeft: 15,
    paddingTop: 13,
    marginTop: 45,
  },
  buttonSaveEdit: {
    width: 109,
    height: 43,
    backgroundColor: "#6EAD3B",
  },
  btnsaveEdit: {
    width: 109,
    height: 73,
    marginLeft: 15,
    paddingTop: 13,
    // marginTop: 45,
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
    height: 40,
    marginLeft: 16,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#F6F6F6",
    borderRadius: 8,
  },
  inputRoleedit: {
    width: 153,
    height: 40,
    marginLeft: 16,
    paddingHorizontal: 10,
    backgroundColor: "#DDDADA",
    borderColor: "#DDDADA",
    borderRadius: 8,
  },
  inputFilestyle: {
    paddingVertical: 10,
  },
  inputFile: {
    width: 150,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  OpsionDropdown: {
    padding: 5,
    marginTop: 3,
    width: 140,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    position: "relative",
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
  styletitle4: {
    justifyContent: "space-between",
    marginLeft: 20,
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

    justifyContent: "center",
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
    flex: 1,
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
    borderBottomColor: "#6EAD3B",
    borderBottomWidth: 1,
  },
  bottomLineprimary: {
    borderBottomColor: "#A19797",
    borderBottomWidth: 1,
    flexDirection: "row",
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
