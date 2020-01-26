import React, {Component, useState, useEffect} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, Alert } from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {newHazard} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        hazards: state.hazardUpdater.hazards
    };
};

const mapDispatchToProps = {
    newHazard: hazard => (newHazard(hazard))
};

export const NewHazard = (props) => {

    const [localState, setLocalState] = useState({
        hazard: {
                title:'',
                src: props.src,
                description: '',
                date: '',
                coordinates: {
                    latitude: props.latitude,
                    longitude: props.longitude,
                  }
        
            },
    });

    function resetForm(){
        setLocalState({ hazard: {
            title:'',
            src:props.latitude,
            description: '',
            date: '',
            coordinates: {
                latitude: props.latitude,
                longitude: props.longitude,
              }
    
        },});
    }

    function handleSubmit(){
       newHazard(localState.hazard)
         }

    return (
        <View>
            <Text> 
                Submit a New Hazard
            </Text>
            <Input
                            placeholder='name'
                            onChangeText={(title) => setLocalState({...localState,title})}
                            value={localState.title}
                        />
            <Input
                            placeholder='description'
                            onChangeText={(description) => setLocalState({...localState,description})}
                            value={localState.description}
                        />
             <Input
                            placeholder='date'
                            onChangeText={(date) => setLocalState({...localState,date})}
                            value={localState.date}
                        />
         
            <Button
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                            color='#5637DD'
                            title='Submit'
                        />
            
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHazard);