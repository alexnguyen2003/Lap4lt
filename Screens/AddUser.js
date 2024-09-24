// screens/AddUser.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig'; // Đảm bảo rằng đường dẫn đúng
import { collection, addDoc } from 'firebase/firestore';

const AddUser = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleAddUser = async () => {
    if (!name || !email || !age) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        name,
        email,
        age, // Thêm trường tuổi
      });
      Alert.alert('Thông báo', 'Thêm người dùng thành công!');
      navigation.navigate('UserManagement');
    } catch (error) {
      console.error('Error adding user: ', error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra khi thêm người dùng.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Người Dùng</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email người dùng"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Tuổi người dùng"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric" // Giới hạn nhập liệu chỉ cho phép số
      />
      <Button title="Thêm" onPress={handleAddUser} />
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

export default AddUser;
