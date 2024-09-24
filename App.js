// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import UserManagement from './Screens/UserManagement';
import UpdateUser from './Screens/UpdateUser';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import AddUser from './Screens/AddUser';
import { Pressable, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import AntDesign from '@expo/vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = (navigation) => {
    setLoading(true);
    setIsLoggingOut(true);

    const auth = getAuth();
    auth.signOut().then(() => {
      setTimeout(() => {
        setLoading(false);
        setIsLoggingOut(false);
        navigation.navigate('Login');
      }, 2000);
    }).catch((error) => {
      setLoading(false);
      setIsLoggingOut(false);
      console.error('Error signing out: ', error);
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen 
          name="Home"  
          component={HomeScreen} 
          options={({ navigation }) => ({
            headerLeft: () => null, 
            title: 'Trang Chủ',
            headerRight: () => (
              <Pressable onPress={() => handleLogout(navigation)}>
                <AntDesign name="logout" size={24} color="black" />
              </Pressable>
            ),
          })} 
        />
        <Stack.Screen name="UserManagement" options={{title:'Danh sách người dùng'}} component={UserManagement} />
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
      </Stack.Navigator>
      
      {isLoggingOut && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Đang đăng xuất...</Text>
        </View>
      )}
    </NavigationContainer>
  );
};

// Styles cho loading overlay
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: 'white',
  },
});

export default App;
