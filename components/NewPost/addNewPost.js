import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FormicPostUploader from './formicPostUploader'

const AddNewPost = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <FormicPostUploader navigation={navigation}/>
    </View>
  )
}

const Header = ({navigation}) => (

  <View style={styles.headerContianer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={{uri:'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}}
        style={{height:30,width:30}}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NEW POST</Text>
    <Text></Text>
  </View>
)

const styles = StyleSheet.create({
  container:{
    marginHorizontal:10,
  },
  headerContianer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  headerText:{
    color:'#fff',
    fontWeight:'700',
    fontSize:20,
    marginRight:25
  }
})

export default AddNewPost