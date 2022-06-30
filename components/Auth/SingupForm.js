import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native'
import React, {useState, useLayoutEffect} from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'



const SignupForm = ({navigation}) => {

    const singupFormSchema = Yup.object().shape({
        email:Yup.string().email().required('An email is required'),
        username:Yup.string().required().min(2, 'A username is required.'),
        password:Yup.string().required().min(8, 'Your password must have atleast 8 characters.')
    })

    const getRandomProfilePicture =  async() => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }


    const onSignup = async(email, password, username) => {
        const profile_picture = await getRandomProfilePicture()
        try {
            const authUser = await auth().createUserWithEmailAndPassword(email,password)
            console.log('Firebase User Created Successfully !!')

            authUser.user.updateProfile({
                photoURL:profile_picture
            })
            
            firestore().collection('users').doc(authUser.user.email).set({
                owner_id:authUser.user.uid,
                username:username,
                email:authUser.user.email,
                profile_picture:profile_picture
            })
        }
        catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                Alert.alert('Email In Use !!','The email address is already in use by another account.',[
                    {
                        text:'OK',
                        onPress:() => console.log('OK')
                    },
                    {
                        text:'Log In',
                        onPress:() => navigation.goBack(),
                        style:'cancel'
                    }
                ])
            }
            else {
                Alert.alert(error.message)
            }
        }
    }

  return (
    <View style={styles.wrapper}>
        <Formik 
            initialValues={{email:'', username:'', password:''}}
            onSubmit={values => {
                onSignup(values.email, values.password, values.username)
            }}
            validationSchema={singupFormSchema}
            validateOnMount={true}
        >

            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                <>
                    <View style={[styles.inputFeild, {borderColor:values.email.length < 1 || Validator.validate(values.email) ? "#ccc" : "#FF0000"}]}>
                        <TextInput
                            placeholderTextColor='#444'
                            placeholder='Email'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress' 
                            autoFocus={true}
                            onChangeText={handleChange('email')}  
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
                    <View style={[styles.inputFeild, {
                        borderColor:1 > values.username.length || values.username.length >= 2 ? '#ccc' : '#FF0000'
                        }]}>
                        <TextInput
                            placeholderTextColor='#444'
                            placeholder='Username'
                            autoCapitalize='none'
                            autoCorrect={false}
                            textContentType='username'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                    </View>

                    <View style={[styles.inputFeild, {
                        borderColor:1 > values.password.length || values.password.length >= 8 ? '#ccc' : '#FF0000'
                        }]}>
                        <TextInput
                            placeholderTextColor='#444'
                            placeholder='Password'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType='password'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                    </View>

                    <View style={{marginBottom:45}}>
                    </View>

                    <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>

                    <View style={styles.signupContainer}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{color:'#6BB0F5',marginLeft:4}}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper:{
        marginTop:60
    },
    inputFeild:{
        borderRadius:4,
        padding:12,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:0.5
    },
    button:(isValid) => ({
        backgroundColor:isValid?'#0096F6':'#9ACAF7',
        alignItems:'center',
        justifyContent:'center',
        minHeight:42,
        borderRadius:4
    }),
    buttonText:{
        fontWeight:'600',
        color:'#fff',
        fontSize:20
    },
    signupContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginTop:50,
    }
})

export default SignupForm