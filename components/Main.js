import React, {Component, useState} from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 
//import {Form} from 'react-native-elements'; 
import {Login} from './Login';
import {Home} from './Home';

export const Main = () => {

        const {loggedIn, setLoggedIn} = useState(false);

    return (
        <View>
            <Text> 
                Welcome to the Main page
            </Text>
            {!loggedIn?<Login />:<Home />}
        </View>
    )
}