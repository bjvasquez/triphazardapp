import React, {Component, useState} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, TextInput } from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MapView} from 'react-native-maps';


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


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

 
       
export const Hazards = (props) => {

    return (
        <View style={styles.container}>
             <MapView style={styles.mapStyle} />
      </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Hazards);