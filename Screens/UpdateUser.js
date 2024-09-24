import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Đảm bảo rằng đường dẫn đúng

const UpdateUser = ({ route, navigation }) => {
  const { id } = route.params;
  const [user, setUser] = useState({ name: '', email: '', age: '' }); // Thêm tuổi vào trạng thái người dùng
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', id));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          Alert.alert('Thông báo', 'Người dùng không tồn tại.');
        }
      } catch (error) {
        console.error('Error fetching user: ', error);
        Alert.alert('Thông báo', 'Có lỗi xảy ra khi lấy thông tin người dùng.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, 'users', id), user);
      Alert.alert('Thông báo', 'Cập nhật thành công!');
      navigation.navigate('UserManagement'); // Quay lại màn hình quản lý người dùng
    } catch (error) {
      console.error('Error updating user: ', error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra khi cập nhật thông tin người dùng.');
    }
  };

  if (loading) return <Text>Đang tải thông tin người dùng...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật thông tin người dùng</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={user.name}
        onChangeText={(text) => setUser((prev) => ({ ...prev, name: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Email người dùng"
        value={user.email}
        onChangeText={(text) => setUser((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Tuổi người dùng"
        value={user.age}
        onChangeText={(text) => setUser((prev) => ({ ...prev, age: text }))}
        keyboardType="numeric" // Giới hạn nhập liệu chỉ cho phép số
      />
      <Button title="Cập nhật" onPress={handleUpdate} />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default UpdateUser;
