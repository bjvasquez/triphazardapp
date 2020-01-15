import React, {Component} from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 
//import {Form} from 'react-native-elements'; 
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        user: state.loginUpdater.user
    };
};

 export const Home = (props) => {
    
    return (
        <View>
            <Text> 
                Welcome to the Home page, {props.user.userName}!
            </Text>
        </View>
    )
}

export default connect(mapStateToProps)(Home);