import React, {Component} from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 
//import {Form} from 'react-native-elements'; 
import Login from './Login';
import Home from './Home';
import {connect} from 'react-redux';


const mapStateToProps = state => {
    return {
        loggedIn: state.loginUpdater.loggedIn,
        user: state.loginUpdater.user
    };
};

export const Main = (props) => {
    return (
        <View>
            {!props.loggedIn?<Login />:<Home />}
        </View>
    )
}

export default connect(mapStateToProps)(Main);