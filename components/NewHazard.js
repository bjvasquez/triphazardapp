import React, {Component, useState} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, Alert } from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';


const mapStateToProps = state => {
    return {
        loggedIn: state.loginUpdater.loggedIn,
    };
};

const mapDispatchToProps = {
    loginSuccess: userInfo => (loginSuccess(userInfo)),
    loginFailed: errMessage => (loginFailed(errMessage))
};


export const NewHazard = (props) => {

    const [localState, setLocalState] = useState({
        newHazard: []
    });

    function resetForm(){
        setLocalState({userName:'',password:''});
    }

    function handleSubmit(users, userInformation){
       
         }

    return (
        <View>
            <Text> 
                Submit a New Hazard
            </Text>
            <Input
                            placeholder='name'
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(userName) => setLocalState({...localState,userName})}
                            value={localState.userName}
                        />
            <Input
                            placeholder='description'
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
            
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHazard);