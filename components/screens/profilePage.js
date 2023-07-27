import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';

import Navbar from '../partials/navbar';
import Header from '../partials/header';
import { apiEndpoint, editProfile, profileUser } from '../middleware/apiEndpoint';
import axios from 'axios';

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [users,setUsers] = useState([]);
  const [UserName, setUserName] = useState("");
  const [NomorHp, setNomorHp] = useState("");
  const [NamaLengkap, setNamaLengkap] = useState("");
  const [password, setpassword] = useState("");
  const [passwordBaru, setpasswordBaru] = useState("");
  const [Foto,setFoto] = useState("");
  const [isThereNewData, setIsThereNewData] = useState(true);


  useEffect(() => {
    fetchUsers();
  }, [isThereNewData]);

  const fetchUsers = async () => {
    profilUrl=profileUser+`/1`
    try {
      const response = await fetch(profilUrl);
      const data = await response.json();
      setUsers(data);

      console.log(password)

      setNamaLengkap(users.NamaLengkap);
      setUserName(users.UserName);
      setNomorHp(users.NomorHp);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  const pickImage= async () => {
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
      console.log('ImagePicker Error: ', error);
    }
  };


  const handleUpdate = async () => {
    console.log('test')


    const data = {
      NamaLengkap: NamaLengkap,
      UserName: UserName,
      NomorHp: NomorHp,
      password: password,
      passwordBaru: passwordBaru,
    };

    console.log(data)
  

    // const formData = new FormData();
    // formData.append("NamaDokumen",NamaDokumen);
    // formData.append("Keterangan", Keterangan);
    // formData.append("Tahun", Tahun);
    // formData.append("NamaDesa", NamaDesa);
    // formData.append("LokasiPenyimpanan", LokasiPenyimpanan);
    // const folderName = NamaDokumen + "-" + LokasiPenyimpanan;
    // formData.append("NamaFile", folderName);
    // console.log(formData)

    
    

  
  
    try {
      editUrl=editProfile+'/1'
      
      // Ganti URL endpoint dengan URL untuk update data
  
      // const config = {
      //   body: formData.toString(),
      //   method: "PUT", // Ganti metode HTTP menjadi PUT
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      // };
  
      // Kirim data ke server menggunakan axios.put dengan FormData sebagai payload
    
      const response = await axios.put(editUrl, data);
      
      const jsondata = response.data;
      // const response = await fetch(updateUrl, config);
      // const data = await response.json();
    
  
      console.log("Data updated successfully:", data);
      // Reset input fields if needed
      console.log("berhasil");
      setNamaLengkap('');
      setUserName('');
      setNomorHp('');
      setpassword('');
      setpasswordBaru('');
      setIsThereNewData(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }

  };

  const storeUserData = async () => {

  };

  return (
    <View style={styles.container}>
    <View style={{position: 'absolute', top: 0}}>
      <Header/>
    </View>
    <View style={styles.profileImageContainer}>
      <Image
        style={styles.profileImage}
        source={{uri: apiEndpoint+`/assets/images/${users.Foto}`}}
      />
      <LinearGradient
                colors={['#90C13B', '#7CB53C', '#378D3F']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={styles.changePhotoButton}
      > 
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.changePhotoButtonText}>Ganti Foto</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
    
    <View style={styles.attributeContainer}>
      <Text style={styles.attributeTitle}>Nama:</Text>
      <View style={styles.attributeValueContainer}>
        <TextInput style={styles.attributeValue} placeholder={users.NamaLengkap} onChangeText={(text) => setNamaLengkap(text)}/>
      </View>
    </View>
    <View style={styles.attributeContainer}>
      <Text style={styles.attributeTitle}>Username:</Text>
      <View style={styles.attributeValueContainer}>
        <TextInput style={styles.attributeValue} placeholder={users.UserName} onChangeText={(text) => setUserName(text)}/>
      </View>
    </View>
    <View style={styles.attributeContainer}>
      <Text style={styles.attributeTitle}>No HP:</Text>
      <View style={styles.attributeValueContainer}>
        <TextInput style={styles.attributeValue} placeholder={users.NomorHp} onChangeText={(text) => setNomorHp(text)}/>
      </View>
    </View>
    <View style={styles.attributeContainer}>
      <Text style={styles.attributeTitle}>Password Lama:</Text>
      <View style={styles.attributeValueContainer}>
        <TextInput style={styles.attributeValue} placeholder="Masukkan Password Lama" secureTextEntry={true} onChangeText={(text) => setpassword(text)}/>
      </View>
    </View>
    <View style={styles.attributeContainer}>
      <Text style={styles.attributeTitle}>Password Baru:</Text>
      <View style={styles.attributeValueContainer}>
        <TextInput style={styles.attributeValue} placeholder="Masukkan Password Baru" secureTextEntry={true} onChangeText={(text) => setpasswordBaru(text)}/>
      </View>
    </View>
    <TouchableOpacity onPress={handleUpdate}>
    <LinearGradient
                colors={['#90C13B', '#7CB53C', '#378D3F']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={styles.saveButton}
      > 
        
          <Text style={styles.saveButtonText}>Simpan</Text>
          
      </LinearGradient>
      </TouchableOpacity>

    <View style={{position: 'absolute', bottom: 0}}>
      <Navbar whichPage="userSetting"/>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0E5E5',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 50,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  changePhotoButton: {
    marginTop: 10,
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 10,
  },
  changePhotoButtonText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
  attributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  attributeTitle: {
    fontWeight: 'bold',
    marginRight: 10,
    flex: 1,
    textAlign: 'left',
  },
  attributeValueContainer: {
    flex: 2,
    height:38,
  },
  attributeValue: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6EAD3B',
    borderRadius: 8,
    padding: 8,
    fontSize:15,
  },
  saveButton: {
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfilePage;
