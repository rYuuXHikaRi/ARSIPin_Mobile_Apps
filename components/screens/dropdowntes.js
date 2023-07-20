import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const ProductListScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.118.213:8000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (userId) => {
    // Implement edit action here
    console.log('Edit user with ID:', userId);
  };

  const handleDelete = (userId) => {
    // Implement delete action here
    console.log('Delete user with ID:', userId);
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.NamaLengkap}</Text>
      <Text style={styles.userRole}>{item.Roles}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item.id)}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
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
  );
};

const styles = StyleSheet.create({
  containertabel: {
    flex: 1,
    padding: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    flex: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRole: {
    flex: 2,
    fontSize: 16,
    color: '#888',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  editButton: {
    marginRight: 10,
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
