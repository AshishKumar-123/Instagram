import { View, Text, Image, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import SingupForm from '../components/Auth/SingupForm'

const INSTARGRAM_LOGO = 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-152.png'

const SignupScreen = ({navigation}) => {
  return (
    <>
        <StatusBar barStyle='dark-content'/>
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={{uri:INSTARGRAM_LOGO, height:100, width:100}}/>
            </View>
            <SingupForm navigation={navigation}/>
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

export default SignupScreen