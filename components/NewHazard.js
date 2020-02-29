import React, {Component, useState, useEffect} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {newHazard} from '../redux/ActionCreators';

const mapStateToProps = (state,props) => {
    return {
        ...props,
    };
};

const mapDispatchToProps = {
    newHazard: hazard => (newHazard(hazard))
};

export const NewHazard = (props) => {

    const [localState, setLocalState] = useState({
                title:'',
                image: props.src,
                description: '',
                latitude: props.latitude,
                longitude: props.longitude,
            
    });

 

    return (
        <View>
            <Text> 
               Add a New Hazard
            </Text>
            <TextInput
                            placeholder='name'
                            onChangeText={(title) => setLocalState({...localState,title:title})}
                            value={localState.title}
                            inputStyle={{color:'black'}}
                        />
            <TextInput
                            placeholder='description'
                            onChangeText={(description) => setLocalState({...localState,description:description})}
                            value={localState.description}
                        />
            
            
         
            <Button
                        onPress={() => {
                          // alert((Object.keys(localState)))
                                    fetch('http://54.173.196.126:3000/hazards', {
                                        method: 'POST', // or 'PUT'
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            title:localState.title,
                                            image: localState.image,
                                            description: localState.description,
                                            latitude: localState.latitude,
                                            longitude: localState.longitude,
                                        }),
                                      }).then(res => {
                                        if(res.status >= 300){
                                        return Promise.reject("bad request or incorrect password, res status code = " 
                                        + res.status);
                                         } else return res;
                                        })
                                        .then((response) => {
                                            alert('successfully added!')
                                            response.json()}
                                            )                                    
                                        .catch((error) => {
                                        console.error(error);
                                        });
                                  
                            props.newHazard(localState);
                       
                        }}
                        color='#5637DD'
                        title='Submit'
                    />
           
           
                
            
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHazard);