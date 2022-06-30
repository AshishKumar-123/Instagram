import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert ,} from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'




const LoginForm = ({navigation}) => {

    const loginFormSchema = Yup.object().shape({
        email:Yup.string().email().required('An email is required'),
        password:Yup.string().required().min(8, 'Your password must have atleast 8 characters.')
    })

    const onLogin = async(email,password) => {
        try {
            await auth().signInWithEmailAndPassword(email, password)
            console.log('Firebase🔥 Login Successful 🚀',email, password)
        }
        catch (error) {
            if (error.code == 'auth/wrong-password') {
                Alert.alert('Authentication Error 🔐 !!','The password is invalid or the user does not have a password.',[
                    {
                        text:'OK',
                        onPress:() => console.log('OK'),
                        style:'cancel'
                    },
                    {
                        text:'Forgot password',
                        onPress:() => Alert.prompt('Change password 🔑','Enter your new password',[
                            {
                                text:'Cancel',
                                onPress:() => console.log('Cancelled password change !!'),
                                style:'destructive'
                            },
                            {
                                text:'Change password',
                                onPress:() => {Alert.alert('Password Changed 🥳!!')},
                                style:'cancel'
                            }
                        ])
                    }
                ])
            }
            if (error.code == 'auth/user-not-found') {
                Alert.alert('Authentication Error 🔐 !!','No such user exists. \n Create a new account.', 
                [
                    {
                        text:'OK',
                        onPress:() => console.log('OK'),
                        style:'cancel'
                    },
                    {
                        text:'Sign Up',
                        onPress:() => navigation.push('SignUp')
                    }
                ])
            }
        }
    }

  return (
    <View style={styles.wrapper}>
        <Formik 
            initialValues={{email:'', password:''}}
            onSubmit={values => {
                onLogin(values.email, values.password)
            }}
            validationSchema={loginFormSchema}
            validateOnMount={true}
        >

            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                <>
                    <View style={[styles.inputFeild, {borderColor:values.email.length < 1 || Validator.validate(values.email) ? "#ccc" : "#FF0000"}]}>
                        <TextInput
                            placeholderTextColor='#444'
                            placeholder='Phone number, username or email'
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
                    <View style={{alignItems:'flex-end',marginBottom:30}}>
                        <Text style={{color:'#6BB0F5'}}>Forgot password?</Text>
                    </View>

                    <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>

                    <View style={styles.signupContainer}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                            <Text style={{color:'#6BB0F5',marginLeft:4}}>Sign Up</Text>
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

export default LoginForm