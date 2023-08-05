import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform,
         StatusBar as StatBar, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

//local
import Header from '../partials/header';
import Navbar from '../partials/navbar';
import { getHistory } from '../middleware/api';



const RiwayatUnduhan = () => {
  const [dataHistory, setDataHistory] = useState(null);
  const userData = useSelector((state) => state.userData);
  
  const fetchHistory = async () => {
    try {
      const response = await fetch(getHistory);
      const data = await response.json();
      const formattedData = data.map(item => ({
        ...item,
        created_at: format(new Date(item.created_at), 'dd-MM-yyyy HH:mm:ss'),
        updated_at: format(new Date(item.updated_at), 'dd-MM-yyyy HH:mm:ss'),
      }));
      setDataHistory(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [])

  console.log(dataHistory)
  return (
    <SafeAreaView style={styles.container}>
        <Header style={{position: 'absolute', top: Platform.OS === 'android' ? StatBar.currentHeight : 0 }}/>

        <View style={{ flex: 1, padding: 16, backgroundColor: '#F0E5E5' }}>
          <View>
            <LinearGradient
                  colors={['#197B40', '#79B33B', '#A6CE39']}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  style={[styles.card]}
            > 
              <Text style={styles.cardTitle}>Riwayat Unduhan</Text>
            </LinearGradient>
            <View style={styles.card2}>
              <View style={styles.row}>
              <View style={styles.card6}>
                      <Text style={styles.headerTable}>Nama Dokumen</Text>
                      <Text style={styles.headerTable}>Tgl diunduh</Text>
                      <Text style={styles.headerTable}>Ukuran</Text>
                      <Text style={styles.headerTable}>Diunduh oleh</Text>
              </View>
                <FlatList
                  data={dataHistory}
                  renderItem={({item, index}) => 
                    <View style={[styles.itemRender, {backgroundColor: index % 2 === 0 ? "#25A9E2" : "#27B9F8"}]}>
                      <View style={{flex: 1.1, marginRight: 15}}>
                        <Text style={styles.itemRenderText}>{item.NamaFile}</Text>
                      </View>

                      <View style={{flex: 1}}>
                        <Text style={styles.itemRenderText}>{item.created_at}</Text>
                      </View>

                      <View style={{flex: 0.7}}>
                        <Text style={styles.itemRenderText}>{item.Ukuran}</Text>
                      </View>

                      <View style={{flex: 1, marginLeft: -5}}>
                        <Text style={styles.itemRenderText}>{item.UserName}</Text>
                      </View>
                    </View>
                  }
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
            
          </View>
          <View style={{position: 'absolute', bottom: 0}}>
            <Navbar whichPage='unduhan' role={userData.Roles}/>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default RiwayatUnduhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    borderRadius: 8,

    paddingLeft: 12,
    height: 43,

    justifyContent: 'center'
  },
  card2: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 5,
    marginTop: 15,
    height: 615,
    width: 350,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  }, 
  row: {
    height: 578
  },
  card6: {
    backgroundColor: '#25AAE2',
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 14,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  attributeTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerTable: {
    color: "white",
    fontSize: 14,
    fontWeight: "500"
  },
  itemRender: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: 'red', 
    paddingLeft: 12, 
    paddingTop: 9, 
    paddingBottom: 9, 
    paddingRight: 12,
    marginBottom: 1,
    borderRadius: 5,
  },
  itemRenderText: {
    fontSize: 12,
    fontWeight: '500',
    color: "white",
    
  },

});
