// screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(); 
      await AsyncStorage.setItem('userToken', token);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Đăng nhập thất bại', error.message());
    }
  };

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      navigation.navigate('Home'); 
    }
  };

  useEffect(() => {
    checkLoginStatus(); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <AntDesign name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', 
    backgroundColor: '#f7f7f7', 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold', 
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff', 
  },
  input: {
    flex: 1, 
    paddingLeft: 10, 
  },
  icon: {
    marginRight: 10, 
  },
  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 12, 
    borderRadius: 10, 
    marginBottom: 15, 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
});

export default LoginScreen;
