import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Screen
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'

const Stack = createStackNavigator()

const screenOptions = {
    headerShown:false
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='Post' component={NewPostScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='SignUp' component={SignupScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
)

