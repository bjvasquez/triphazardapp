import React, {Component, useState} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, Alert } from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import {loginFailed,loginSuccess} from '../redux/ActionCreators';
import Icon from 'react-native-vector-icons/FontAwesome';


const mapStateToProps = state => {
    return {
        loggedIn: state.loginUpdater.loggedIn,
        users: state.loginUpdater.users,
        user: state.loginUpdater.user
    };
};

const mapDispatchToProps = {
    loginSuccess: userInfo => (loginSuccess(userInfo)),
    loginFailed: errMessage => (loginFailed(errMessage))
};
export const Login = (props) => {

    const [localState, setLocalState] = useState({
        userName: '',
        password:'',
    });

    function resetForm(){
        setLocalState({username:'',password:''});
    }

    function handleSubmit(users, userInformation){
        console.log(users,userInformation)
        let user = users.filter(user=>{
           return (user.userName === userInformation.userName && user.password === userInformation.password)
        });
        if(user.length===1){
            props.loginSuccess(user[0])
        } else {
            Alert.alert('Login Failed','You entered an incorrect password',[{text:'OK'}],{cancelable:true});
            props.loginFailed("incorrect username or password");   
        }
         }

    return (
        <View>
            <Text> 
                Welcome to the Login page
            </Text>
            <Input
                            placeholder='username'
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(userName) => setLocalState({...localState,userName})}
                            value={localState.userName}
                        />
            <Input
                            placeholder='Password'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(password) => setLocalState({...localState,password})}
                            value={localState.password}
                            secureTextEntry={true}
                        />
         
            <Button
                            onPress={() => {
                                handleSubmit(props.users,localState);
                                resetForm();
                            }}
                            color='#5637DD'
                            title='Submit'
                        />
                        
             <Button
                            onPress={() => {
                                //handleSubmit(props.users,localState);
                               
                                fetch('http://54.173.196.126:3000/users/signup', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        username: localState.userName,
                                        password: localState.password,
                                    }),
                                    }).then((response) => response.json())
                                        .then((responseJson) => {
                                            if(!responseJson.err){
                                                alert(Object.keys(responseJson));
                                        return  props.loginSuccess(localState)
                                            } else return new Error ('user already exists');
                                        })
                                        .catch((error) => {
                                        console.error(error);
                                        });
                                resetForm();
                            }}
                            color='#5637DD'
                            title='Sign up'
                        />
            
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);