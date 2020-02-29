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
                                //handleSubmit(props.users,localState);
                                fetch('http://54.173.196.126:3000/users/login', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        username: localState.userName,
                                        password: localState.password,
                                    }),
                                    }).then(res => {if(res.status >= 400){
                                        return Promise.reject("bad request or incorrect password");
                                    } else return res;
                                }).then((response) => response.json())
                                        .then((responseJson) => {
                                            if(!responseJson.err){
                                                alert(Object.keys(responseJson));
                                        return  props.loginSuccess(localState)
                                            } return Promise.reject("bad request or incorrect password");
                                        })
                                        .catch((error) => {
                                        console.error(error);
                                        });
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
                                                alert("sign up successful!");
                                       // return  props.loginSuccess(localState)
                                            } else alert('user already exists');
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