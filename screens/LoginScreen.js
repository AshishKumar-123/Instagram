import { View, Text, StyleSheet, Image,StatusBar } from 'react-native'
import React from 'react'
import LoginForm from '../components/Auth/LoginForm'

const INSTARGRAM_LOGO = 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-152.png'

const LoginScreen = ({navigation}) => {
  return (
    <>
        <StatusBar barStyle='dark-content'/>
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={{uri:INSTARGRAM_LOGO, height:100, width:100}}/>
            </View>
            <LoginForm navigation={navigation}/>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        paddingTop:50,
        paddingHorizontal:12
    },
    logoContainer:{
        alignItems:'center',
        marginTop:60
    }
})
export default LoginScreen