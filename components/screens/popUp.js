import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet ,TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const PopUpTaccnt = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  const handleSave = () => {
    // Lakukan sesuatu dengan data yang diisi
    console.log('Username:', username);
    console.log('Nama Lengkap:', fullName);
    console.log('Email:', email);
    console.log('Role:', role);

    // Setelah melakukan sesuatu, tutup modal
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
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
            <Text style={styles.modalText}>Tambah Akun</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Nama Lengkap"
              onChangeText={text => setFullName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
            />
            <RNPickerSelect
              style={pickerSelectStyles.input}
              value={role}
              onValueChange={value => setRole(value)}
              items={[
                { label: 'User', value: 'user' },
                { label: 'Admin', value: 'admin' },
              ]}
            />
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleSave}>
              <Text style={styles.textStyle}>Simpan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Buka Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 390,
    height: 844,
    margin:18,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
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
    padding: 10,
    elevation: 2,
    marginVertical: 10,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default PopUpTaccnt;
