import React, {Component, useState} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, TextInput } from 'react-native';
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
        setLocalState({userName:'',password:''});
    }

    function handleSubmit(users, userInformation){
        console.log(users,userInformation)
        let user = users.filter(user=>{
           return (user.userName === userInformation.userName && user.password === userInformation.password)
        });
        console.log(user[0])
        console.log(props.loginSuccess);
        user.length===1?(props.loginSuccess(user[0])):props.loginFailed("incorrect username or password");
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
                        />
         
            <Button
                            onPress={() => {
                                handleSubmit(props.users,localState);
                                resetForm();
                            }}
                            color='#5637DD'
                            title='Submit'
                        />
            
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);