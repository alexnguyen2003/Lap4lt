import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; // Thêm biểu tượng

const UserManagement = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users: ', error);
      } finally {
        setLoading(false);
      }
    };

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Thông báo', 'Bạn cần đăng nhập để truy cập chức năng này.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } else {
      fetchUsers();
    }
  }, [navigation, auth]);

  const handleDelete = useCallback((id) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa người dùng này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'users', id));
              setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            } catch (error) {
              console.error('Error deleting user: ', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  const handleUpdate = (id) => {
    navigation.navigate('UpdateUser', { id });
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Người Dùng</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfo}>Tên: {item.name}</Text>
              <Text style={styles.userInfo}>Email: {item.email}</Text>
              <Text style={styles.userInfo}>Tuổi: {item.age} tuổi</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleUpdate(item.id)}>
                <AntDesign name="edit" size={24} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddUser')}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  userCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  userInfoContainer: {
    marginBottom: 10, // Khoảng cách giữa thông tin và nút
  },
  userInfo: {
    fontSize: 16,
    marginVertical: 2, // Khoảng cách giữa các dòng
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginLeft: 10,
    padding: 5, // Thêm khoảng cách cho khu vực nhấn
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 15,
    elevation: 5, // Tạo bóng cho nút
  },
});

export default UserManagement;
