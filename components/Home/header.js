import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'

const Header = ({navigation}) => {

    const handleSignOut = async() => {
        try {
            await auth().signOut()
            console.log('Signed Out !!')
        }
        catch (error) {
            Alert.alert(error.message)
        }
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleSignOut}>
            <Image 
                style={styles.logo}
                source={require('../../assets/header-logo.png')}
            />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => navigation.push('Post')}>
                <Image 
                    source={{
                        uri:'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'
                    }}
                    style={styles.icon}
                />
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Image 
                    source={{
                        uri:'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
                    }}
                    style={styles.icon}
                />
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.unreadBadges}>
                    <Text style={styles.unreadBadgesText}>11</Text>
                </View>
                <Image 
                    source={{
                        uri:'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'
                    }}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:20
    },
    logo:{
        width:100,
        height:50,
        resizeMode:'contain'
    },
    iconsContainer:{
        flexDirection:'row'
    },
    icon:{
        width:30,
        height:30,
        marginLeft:10,
        resizeMode:'contain'
    },
    unreadBadges:{
        position:'absolute',
        backgroundColor:'#FF3250',
        left:20,
        bottom:18,
        width:25,
        height:18,
        borderRadius:25,
        alignItems:'center',
        zIndex:100
    },
    unreadBadgesText:{
        color:'white',
        fontWeight:'600'
    }
})

export default Header