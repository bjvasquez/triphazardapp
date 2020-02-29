import React, {Component, useState} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, Alert } from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import {loginFailed,loginSuccess} from '../redux/ActionCreators';
import Icon from 'react-native-vector-icons/FontAwesome';




const mapDispatchToProps = {
    loginSuccess: userInfo => (loginSuccess(userInfo)),
    loginFailed: errMessage => (loginFailed(errMessage))
};
export const Logout = (props) => {

    return (
        <View>
            <Text> 
               Are you sure you want to log out? 
            </Text>
           
            <Button
                            onPress={() => {
                                fetch('http://54.173.196.126:3000/users/logout', {
                                    method: 'GET',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    }).then(res => {if(res.status >= 400){
                                        return Promise.reject("bad request or incorrect password");
                                    } else return res;
                                }).then((response) => response.json())
                                        .then((responseJson) => {
                                            if(!responseJson.err){
                                                alert('You are logged out!');
                                        return  props.loginFailed();
                                            } return Promise.reject("bad request or incorrect password");
                                        })
                                        .catch((error) => {
                                        console.error(error);
                                        });
                            }}
                            color='#5637DD'
                            title='Submit'
                        />
                        
           
            
        </View>
    )
}

export default connect(undefined, mapDispatchToProps)(Logout);