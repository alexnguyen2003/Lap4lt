// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator ,StyleSheet} from 'react-native';
import { getAuth } from 'firebase/auth';
import { TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const auth = getAuth();


  return (
    <View>
    <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('UserManagement')}>
        <Text style={styles.buttonText}>Quản lý người dùng</Text>
      </TouchableOpacity>
  </View>
  );
};
const styles = StyleSheet.create({
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
})
export default HomeScreen;
