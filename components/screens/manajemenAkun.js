import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Modal ,TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';



const ManajemenAkun = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSave = () => {
    // Lakukan sesuatu dengan data yang diisi
    console.log('Username:', username);
    console.log('Nama Lengkap:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);

    // Setelah melakukan sesuatu, tutup modal
    setModalVisible(false);
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Manajemen Akun</Text>
      </View>
      <View style={styles.card2}>
        <View style={styles.row}>
          <Text style={[styles.cardTitle2, styles.bottomLine]}>Admin</Text>
          <Text style={[styles.cardTitle3, styles.bottomLine]}>Petugas</Text>
        </View>
      </View>
      <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.Headtitle}>
                  <Text style={[styles.bottomLine,styles.titleModal]}>Tambah Akun</Text>
                </View>
                  <View style={styles.styletitle}>
                    <View style={styles.styletitle2}>
                        <Text style={styles.titleform}>Nama User</Text>
                        <TextInput
                          style={[styles.inputName]}
                          placeholder="Username"
                          onChangeText={text => setUsername(text)}
                        /> 
                      </View>
        
                    <View style={styles.styletitle2}>
                        <Text style={styles.titleform}>Nama Lengkap</Text>
                        <TextInput
                          style={styles.inputName}
                          placeholder="Nama Lengkap"
                          onChangeText={text => setFullName(text)}
                        />
                    </View>
                  </View>

                      <Text style={styles.titleform}>Email</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={text => setEmail(text)}
                      />
                      <Text style={styles.titleform}>Kata Sandi</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Katak sandi"
                        onChangeText={text => setPassword(text)}
                      />

                      {/* <RNPickerSelect
                        style={pickerSelectStyles}
                        value={role}
                        onValueChange={value => setRole(value)}
                        items={[
                          { label: 'User', value: 'user' },
                          { label: 'Admin', value: 'admin' },
                        ]}
                        /> */}
                      <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleSave}>
                        <Text style={styles.textStyle}>Simpan</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text>Hide Modal</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

            <Text style={styles.buttonText} onPress={() => setModalVisible(true)}>+ Tambah Akun</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.row}>
          <TouchableOpacity style={styles.searchButton}>
            <AntDesign name="search1" size={24} color="black" />
            <Text style={styles.searchButtonText}>   Pencarian...</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default ManajemenAkun;

const styles = StyleSheet.create({
  //Modal Style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    width: 354,
    height: 444,
    marginLeft: 20,
    marginRight:20,
    marginTop:-130,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 1,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleModal: {
    fontSize: 20,
    marginTop:22,
    fontWeight: 'bold',
    color: '#6EAD3B',
    paddingBottom:8,
  },
  input: {
    width: 319,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    marginLeft:18,
    marginRight:18,
  },
  inputWithBorder: {
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle:'solid',
  },
  inputName:{
    width: 153,
    height: 34,
    marginLeft:16,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
  titleform:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft:18,
    color: '#6EAD3B',
    height: 30,
    flexDirection:'column',
  },
  styletitle:{
    flexDirection:'row',
    paddingTop:18,
  },
  styletitle2:{
    justifyContent: 'space-between',
  },
  Headtitle:{
    paddingLeft:16,
  },
  pickerSelectStyles:{
    padding:1,
  },
//--end

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0E5E5',
  },
  card: {
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 16,
    marginTop: 50,
    height: 60,
  },
  card2: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 5,
    marginTop: 30,
    height: 462,
    width: 354,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius:10,
    marginBottom: 8,
    color: 'white',
    height: 43,
    width: 352,
    justifyContent: 'center',
  },
  cardTitle2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6EAD3B',
    height: 30,
    justifyContent: 'center',
    alignContent:'center',
    flex: 1,
  },
  cardTitle3: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6EAD3B',
    height: 30,
    justifyContent: 'center',
    textAlign: 'right',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomColor: '#6EAD3B',
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
    height: 60,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop:10,
  },
  searchButton: {
    backgroundColor: 'white',
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
    fontWeight: 'bold',
    textAlign:"left"
  },
});
