import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'


import AddNewPost from '../components/NewPost/addNewPost'

const NewPostScreen = ({navigation}) => {
  const uploadPost = () => {
    
  }
  return (
    <SafeAreaView style={{backgroundColor:'#000000', flex:1}}>
        <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

export default NewPostScreen