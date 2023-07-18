import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

//local
import Header from '../partials/header';
import Navbar from '../partials/navbar';

const RiwayatUnduhan = () => {
  return (
            <SafeAreaView style={styles.container}>
                <View style={{position: 'absolute', top: 0}}>
                  <Header />
                </View>

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


                      </View>

                    </View>
                  </View>
                  
                </View>
                <View style={{position: 'absolute', bottom: 0}}>
                  <Navbar whichPage='unduhan'/>
                </View>
            </SafeAreaView>
  );
};

export default RiwayatUnduhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0E5E5',
  },
  card: {
    borderRadius: 8,
    marginTop: 76,
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
    height: 460,
    width: 350,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },

  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card6: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 315,
    height: 60,
  },
  attributeTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },


});
