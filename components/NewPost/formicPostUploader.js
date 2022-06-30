import { View, Text, Image , TextInput, Button} from 'react-native'
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import validUrl from 'valid-url'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const placeholderImage = 'https://www.omuthiyatc.org.na/wp-content/uploads/2018/11/placeholder-16-9.jpg'

const uploadPostSchema = Yup.object().shape({
    imageURL:Yup.string().url().required('A URL is required.'),
    caption:Yup.string().max(2200, 'Caption has reached out of character.')
})

const FormicPostUploader = ({navigation}) => {
    const [thumbmailURL, setThumbmailURL] = useState(placeholderImage)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = auth().currentUser

        const unsubscribe = firestore().collection('users').where("owner_id" , "==" , user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {setCurrentLoggedInUser({
                username:doc.data().username,
                profile_picture:doc.data().profile_picture
            })}
            )
        )
        return unsubscribe;
    }   

    useEffect(() => {getUsername()},[])


    const uploadPostToFirebase = (imageURL, caption,) => {
        const unsubscribe = firestore().collection('users').doc(auth().currentUser.email).collection('posts').add({
            imageURL:imageURL,
            user:currentLoggedInUser.username,
            profile_picture:currentLoggedInUser.profile_picture,
            owner_uid:auth().currentUser.uid,
            caption:caption,
            createdAt:firestore.FieldValue.serverTimestamp(),
            likes:0,
            likes_by_users:[],
            comments:[]
        }).then(() => navigation.goBack())
    }

    return (
        <Formik 
            initialValues={{caption:'', imageURL:''}} 
            onSubmit={(values) => 
                {
                    uploadPostToFirebase(values.imageURL, values.caption)
                }
            } 
            validationSchema={uploadPostSchema}
            validateOnMount={true}
            >
                
                {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
                    <View style={{margin:20}}>
                        <View style={{ justifyContent:'space-between', flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'grey',paddingBottom:18}}>

                            <Image 
                                source={{uri:validUrl.isUri(thumbmailURL)?thumbmailURL:placeholderImage}} 
                                style={{width:100, height:100}} />
                        
                            <View style={{flex:1,marginLeft:10}}>
                                <TextInput 
                                    placeholder='Write a caption...' 
                                    placeholderTextColor='gray' 
                                    multiline={true} 
                                    style={{color:'white',fontSize:20}}
                                    onChangeText={handleChange('caption')}
                                    onBlur={handleBlur('caption')}
                                    value={values.caption}
                                />
                            </View>
                        </View>
                        <View style={{marginTop:10}}>
                            <TextInput 
                                    onChange={(e) => setThumbmailURL(e.nativeEvent.text)}
                                    placeholder='Enter Image URL' 
                                    placeholderTextColor='gray'
                                    style={{fontSize:18, color:'white'}}
                                    onChangeText={handleChange('imageURL')}
                                    onBlur={handleBlur('imageURL')}
                                    value={values.imageURL}
                                />
                                {errors.imageURL && (
                                    <Text style={{fontSize:10, color:'red'}}>
                                        {errors.imageURL}
                                    </Text>
                                )}
                        </View>
                        <Button onPress={handleSubmit} title='Share' disabled={!isValid}/>
                    </View>
                )}

        </Formik>
    )
}

export default FormicPostUploader