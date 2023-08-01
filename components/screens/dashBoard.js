import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

// local
import Header from '../partials/header';
import Navbar from '../partials/navbar';
import GradientText from '../partials/gradientText';

const DashBoard = () => {
  const userData = useSelector((state) => state.userData);
  console.log(userData);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{position: 'absolute', top: 0}}>
        <Header />
      </View>
      <GradientText 
                    colors={['#90C13C', '#3C903F']} 
                    x1={0} y1={0.5} x2={1} y2={0.5}
                    style={styles.title}
      >Halo, {'\n'}{userData.NamaLengkap}</GradientText>
      <LinearGradient
                      colors={['#197B40', '#79B33B', '#A6CE39']}
                      start={[0, 0.5]}
                      end={[1, 0.5]}
                      style={[styles.card]}
      > 
        <Text style={styles.cardTitle}>Statistik</Text>
      </LinearGradient>
      <View style={styles.row}>
        <View style={styles.column}>
          <LinearGradient
                            colors={['#60CE39', '#D6DF20']}
                            start={[0, 0.5]}
                            end={[1, 0.5]}
                            style={[styles.card1, { height: 246 }]}
          > 
              <Text style={styles.cardTitle}>Jumlah Akun</Text>
              <Text style={[styles.cardTitle, {fontSize: 24, textAlign: 'center'}]}>{'\n'}Admin</Text>
              <Text style={styles.cardValue}>1</Text>
              <Text style={[styles.cardTitle, {fontSize: 24,textAlign: 'center'}]}>Petugas</Text>
              <Text style={styles.cardValue}>1</Text>
          </LinearGradient>
        </View>
        <View style={styles.column2}>
          <View>
            <View style={styles.card2}>
              <Text style={styles.cardTitle}>Kategori Arsip</Text>
            </View>
            <View style={styles.card3}>
              <Text style={[styles.cardValue, { color: '#FBA919' }]}>6</Text>
            </View>
          </View>

          <View style={{marginTop: 0}}>
            <View style={styles.card2}>
              <Text style={styles.cardTitle}>Jumlah Arsip</Text>
            </View>
            <View style={styles.card3}>
              <Text style={[styles.cardValue, { color: '#FBA919' }]}>27</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.card4}>
        <Text style={styles.cardTitle}>Jumlah Arsip Diunduh</Text>
      </View>
          <View style={styles.card5}>
            <Text style={[styles.cardValue, { color: '#FBA919' }]}>627</Text>
          </View>
      <View style={{position: 'absolute', bottom: 0}}>
        <Navbar whichPage='home' />
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0E5E5',
  },
  title: {
    marginTop: 72,
    marginBottom:30,
    fontSize: 36,
    fontWeight: '800',
  },
  card: {
    borderRadius: 8,
    marginTop: 30,
    paddingLeft: 12,
    justifyContent: 'center',

    width: 352,
    height: 43
  },
  card1: {
    backgroundColor: '#6EAD3B',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,

    width: 171,
    height: 246
  },
  card2: {
    backgroundColor: '#25AAE2',
    borderRadius: 8,
    marginBottom: 5,
    width: 159,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card3: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 160,
    marginBottom:20,
    height: 66,

    justifyContent: 'center'
  },
  card4: {
    backgroundColor: '#25AAE2',
    borderRadius: 8,
    marginBottom: 5,
    marginTop:10,
    height:35,

    justifyContent: 'center',
    alignItems: 'center'
  },
  card5: {
    backgroundColor: 'white',
    borderRadius: 8,
    height:100,

    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    
  },
  cardValue: {
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 8,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  column2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
});

export default DashBoard;