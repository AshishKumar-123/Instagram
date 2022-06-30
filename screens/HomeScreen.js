import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

// Component
import Header from '../components/Home/header'
import Stories from '../components/Home/stories'
import Post from '../components/Home/post'
import BottomTab from '../components/Home/bottomtab'

// Data
import {USERS} from '../data/users'

// Asstes
import { bottomTabIcons } from '../assets/bottomTabIcons'

const HomeScreen = ({navigation}) => {
  const [post, setPost] = useState([].reverse())

  useEffect(() => {
    firestore().collectionGroup('posts').onSnapshot((snapshot) => {
      setPost(snapshot.docs.map(doc => doc.data()))
    })
  },[])


  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <Stories users={USERS}/>
      <ScrollView>
        {
          post.map((post,index) => (
            <Post posts={post} key={index}/>
          ))
        }
      </ScrollView>
      <BottomTab icons={bottomTabIcons}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#000000',
    flex:1
  }
})

export default HomeScreen