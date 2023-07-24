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
import { Table, Row } from "react-native-table-component";
import Header from "../partials/header";
import Navbar from "../partials/navbar";
import { useEffect } from "react";

const ManajemenAkun = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const options = ["User", "Admin"];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://192.168.134.213:8000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleEdit = (userId) => {
    // Implement edit action here
    console.log("Edit user with ID:", userId);
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
    setModalVisibleEdit(true);
    // renderOpsiModalEdit(userId);
    console.log("yey");
  };

  const handleDelete = (userId) => {
    // Implement delete action here
    console.log("Delete user with ID:", userId);
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
              placeholder="Nomor HP"
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.titleform}>Kata Sandi</Text>
            <TextInput
              style={styles.input}
              placeholder="Kata Sandi"
              onChangeText={(text) => setPassword(text)}
            />

            <View style={styles.styletitle3}>
              <View style={styles.styletitle2}>
                <Text style={styles.titleform}>Role</Text>
                <View style={styles.inputRole}>
                  <TouchableOpacity onPress={toggleDropdown}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        backgroundColor: "#F6F6F6",
                        paddingVertical: 10,
                      }}
                    >
                      {selectedOption !== ""
                        ? selectedOption
                        : "Plih Role          "}
                      <Feather name="chevron-down" size={20} color={"black"} />
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
          <View style={styles.modalView}>
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
                      onChangeText={(text) => setUsername(text)}
                    />
                  </View>

                  <View style={styles.styletitle2}>
                    <Text style={styles.titleform}>Nama Lengkap</Text>
                    <TextInput
                      style={styles.inputName}
                      placeholder={selectedUser.UserName}
                      onChangeText={(text) => setFullName(text)}
                    />
                  </View>
                </View>
                <Text style={styles.titleform}>Nomor HP</Text>
                <TextInput
                  style={styles.input}
                  placeholder={selectedUser.NomorHp}
                  onChangeText={(text) => setEmail(text)}
                />

                <Text style={styles.titleform}>Kata Sandi</Text>
                <TextInput
                  style={styles.input}
                  placeholder={selectedUser.Password}
                  onChangeText={(text) => setPassword(text)}
                />

                <View style={styles.styletitle3}>
                  <View style={styles.styletitle2}>
                    <Text style={styles.titleform}>Role</Text>
                    <View style={styles.inputRole}>
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
                    <TextInput style={styles.inputFile} placeholder="Pilih" />
                  </View>
                </View>
              </>
            )}

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
          onPress={() => handleDelete(item.id)}
        >
          {/* <Text style={styles.actionText}>Delete</Text> */}
          <FontAwesome name="trash" size={25} color="#A6D17A" />
        </TouchableOpacity>
      </View>
    </View>
  );
  // const tableHead = ["Nama", "Role", "Aksi"];
  // const tableData = [
  //   [
  //     <TouchableOpacity onPress={() => console.log("Akun 1")}>
  //       <Text style={[styles.tableText, { fontSize: 20 }]}>Agus</Text>
  //     </TouchableOpacity>,
  //     <Text style={[styles.tableText, { fontSize: 20 }]}>Admin</Text>,
  //     renderOpsiIcons(),
  //   ],
  //   [
  //     <TouchableOpacity onPress={() => console.log("Akun 2")}>
  //       <Text style={[styles.tableText, { fontSize: 20 }]}>Sunar</Text>
  //     </TouchableOpacity>,
  //     <Text style={[styles.tableText, { fontSize: 20 }]}>Petugas</Text>,
  //     renderOpsiIcons(),
  //   ],
  //   [
  //     <TouchableOpacity onPress={() => console.log("Akun 3")}>
  //       <Text style={[styles.tableText, { fontSize: 20 }]}>Yo</Text>
  //     </TouchableOpacity>,
  //     <Text style={[styles.tableText, { fontSize: 20 }]}>Admin</Text>,
  //     renderOpsiIcons(),
  //   ],
  // ];

  // function renderOpsiIcons() {
  //   return (
  //     <View style={styles.opsiContainer}>
  //       <TouchableOpacity style={[styles.opsiButton, styles.greenButton]}>
  //         <MaterialCommunityIcons name="pencil" size={25} color="black" />
  //       </TouchableOpacity>

  //       <TouchableOpacity style={[styles.opsiButton, styles.yellowButton]}>
  //         <FontAwesome name="trash" size={25} color="black" />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

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
          {/* <Table borderStyle={{ borderWidth: 1, borderColor: "white" }}>
            <Row
              data={tableHead}
              flexArr={[4, 2, 1.3]}
              style={[styles.header, styles.boldText]}
              textStyle={[styles.text, styles.boldText, { fontSize: 20 }]}
            />
            {tableData.map((rowData, index, columnData) => (
              <Row
                key={index}
                data={rowData}
                flexArr={[4, 2, 1.3]}
                style={[
                  styles.row,
                  index % 2 && { backgroundColor: "#e1fcc5" },
                ]}
                textStyle={styles.text}
              />
            ))}
          </Table> */}
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
        <TouchableOpacity style={styles.button}>
          <View style={styles.row}>{renderOpsiModalAdd()}</View>
          </TouchableOpacity>
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
    backgroundColor: "#DDDADA",
    borderColor: "#DDDADA",
    borderRadius: 8,
  },
  inputFile: {
    width: 150,
    height: 40,
    paddingHorizontal: 10,
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
