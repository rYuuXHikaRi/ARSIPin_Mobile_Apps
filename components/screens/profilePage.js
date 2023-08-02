import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';

import Navbar from '../partials/navbar';
import Header from '../partials/header';
import { apiEndpoint, editProfile, profileUser } from '../middleware/apiEndpoint';
import axios from 'axios';
import * as DocumentPicker from "expo-document-picker";
import { focusProps } from 'react-native-web/dist/cjs/modules/forwardedProps';


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
    profilUrl=profileUser+'/1'
    try {
      const response = await fetch(profilUrl);
      const data = await response.json();
      setUsers(data);

      console.log(users)

      setNamaLengkap(users.NamaLengkap);
      setUserName(users.UserName);
      setNomorHp(users.NomorHp);
      setSelectedImg(null);
      setFoto("");
      setIsThereNewData(false);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false, // Set to true if you want to allow multiple files
        type: "image/*", // Adjust the file type based on your requirements
      });
  
      console.log(result);
      if (result.type === "success") {
        if (result.type === "success" && result.uri) {
          // Perform automatic cropping for images only
          if (result.type.startsWith('image/')) {
            // Crop the image
            const croppedResult = await ImageManipulator.manipulateAsync(
              result.uri,
              [{ crop: { originX: 0, originY: 0, width: 300, height: 300 } }],
              { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );
  
            // Now croppedResult.uri contains the cropped image URI
            console.log('Cropped image URI:', croppedResult.uri);
  
            // Use the cropped URI for further processing or set it in the state for uploading
        // Store the URI in the selectedFiles state
            const file = {
              uri: croppedResult.uri,
              name: result.name, // Use the original file name
              mimeType: result.mimeType,
              size: result.size,
              type: result.type

            };
            setFoto(file);
            console.log(1)
          } else {
          // Store the URI in the selectedFiles state
            const file = {
              uri: result.uri,
              name: result.name, // Use the original file name
              type: result.mimeType,
            };
            setFoto(file);
            console.log(2)
          }
  
          console.log('File URI:', result.uri);
        }
      } else if (result.type === "cancel") {
        console.log("User cancelled document picker");
      }
    } catch (error) {
      console.log("DocumentPicker Error: ", error);
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
        const lastDotIndex = result.assets[0].uri.lastIndexOf(".");
        const substringAfterLastDot = result.assets[0].uri.slice(lastDotIndex + 1);
        console.log('ini 3 digit terakhir',substringAfterLastDot)
        const file = {
          mimeType:`image/${substringAfterLastDot}`,
          name: 'profile.jpg',
          type: 'success',
          uri: result.assets[0].uri,
    
        
        };
        setFoto(JSON.stringify(file));
        console.log('ini file',JSON.stringify(file))
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };


  const handleUpdate = async () => {
    console.log('ini foto',Foto)

    datanew= new FormData();
    datanew.append("_method", "PUT");
    datanew.append("NamaLengkap",NamaLengkap);
    datanew.append("UserName",UserName);
    datanew.append("NomorHp",NomorHp);
    datanew.append("password",password);
    datanew.append("passwordBaru",passwordBaru);
    datanew.append("Foto",Foto);
    console.log(Foto)


    // const data = {
    //   NamaLengkap: NamaLengkap,
    //   UserName: UserName,
    //   NomorHp: NomorHp,
    //   password: password,
    //   passwordBaru: passwordBaru,
    //   Foto: gambar,
    // };

   
    console.log(datanew)
  

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
    
      const response = await axios.post(editUrl, datanew, {
        headers: {
          "Content-Type": "multipart/form-data" // Set the Content-Type header to multipart/form-data
        }
      });
      
      const jsondata = response.datanew;
      // const response = await fetch(updateUrl, config);
      // const data = await response.json();
    
  
      console.log("Data updated successfully:", datanew);
      // Reset input fields if needed
      console.log("berhasil");
      setNamaLengkap('');
      setUserName('');
      setNomorHp('');
      setpassword('');
      setpasswordBaru('');
      setFoto('')
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
        source={Foto=== "" ? {uri: apiEndpoint+`/assets/images/${users.Foto}`} : {uri:Foto.uri }}
        
      />
      <LinearGradient
                colors={['#90C13B', '#7CB53C', '#378D3F']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={styles.changePhotoButton}
      > 
        <TouchableOpacity onPress={handleFilePick}>
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
    <TouchableOpacity onPress={() => {handleUpdate();fetchUsers()}}>
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
