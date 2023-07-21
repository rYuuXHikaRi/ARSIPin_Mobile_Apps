import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const ProductListScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State untuk menyimpan data user yang akan ditampilkan dalam modal
  const [isEditModalVisible, setEditModalVisible] = useState(false);

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
    // Temukan data user berdasarkan ID dan simpan dalam state selectedUser
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleDelete = (userId) => {
    // Implement delete action here
    console.log('Delete user with ID:', userId);
  };

  const renderOpsiModalEdit = () => {
    // Implement modal edit here
    // Misalnya, Anda bisa menggunakan Modal dan menampilkan data dari state selectedUser
    return (
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View>
          <Text>Edit User</Text>
          {selectedUser && (
            <>
              <Text>Nama Lengkap: {selectedUser.NamaLengkap}</Text>
              <Text>Role: {selectedUser.Roles === 1 ? 'admin' : 'user'}</Text>
              {/* Tampilkan form edit di sini */}
              {/* Contoh:
              <TextInput
                value={selectedUser.NamaLengkap}
                onChangeText={(text) => handleEditNamaLengkap(text)}
              />
              <Button title="Simpan" onPress={() => handleSimpan()} />
              */}
            </>
          )}
          <TouchableOpacity onPress={() => setEditModalVisible(false)}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.NamaLengkap}</Text>
      <Text style={styles.userRole}>{item.Roles === 1 ? 'admin' : 'user'}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item.id)}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="#197B40" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <FontAwesome name="trash" size={25} color="#A6D17A" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
      {renderOpsiModalEdit()} {/* Tampilkan modal edit di sini */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
