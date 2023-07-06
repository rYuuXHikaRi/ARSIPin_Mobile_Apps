import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashBoard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Halo, Administrator</Text>
      <View style={styles.statistikBar}>
        <Text style={styles.statistikText}>Statistik</Text>
      </View>
      <View style={styles.borderRight}></View>
      <View style={styles.borderLeftTop}></View>
      <View style={styles.borderLeftBottom}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  greetingText: {
    fontSize: 20,
    marginBottom: 20,
  },
  statistikBar: {
    width: 352,
    height: 43,
    borderRadius: 10,
    backgroundColor: 'linear-gradient(90deg, #197B40 0%, #79B33B 43.66%, #A6CE39 100%)',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statistikText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  borderRight: {
    width: 171,
    height: 246,
    backgroundColor: 'green',
    marginRight: 10,
    flexShrink: 0,
  },
  borderLeftTop: {
    width: 159,
    height: 66,
    backgroundColor: 'gray',
    marginRight: 10,
    marginBottom: 10,
    flexShrink: 0,
  },
  borderLeftBottom: {
    width: 159,
    height: 66,
    backgroundColor: 'gray',
    marginRight: 10,
    flexShrink: 0,
  },
});

export default DashBoard;
