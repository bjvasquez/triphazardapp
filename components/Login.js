import React, {Component} from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 
import {connect} from 'react-redux';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../redux/ActionTypes';


const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        users: state.users,
        user: state.user
    };
};

const mapDispatchToProps = {
    loginSuccess: userInfo => (LOGIN_SUCCESS(userInfo)),
    loginFailed: errMessage => (LOGIN_FAILED(errMessage))
};
export const Login = () => {

    return (
        <View>
            <Text> 
                Welcome to the Login page
            </Text>
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);