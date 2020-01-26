import React, {Component, useState, useEffect} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {newHazard} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        hazards: state.hazards
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
    
    function showHazards(hazards){
        Alert.alert(hazards);
    }
    return (
        <View>
            <Text> 
               Add a New Hazard
            </Text>
            <TextInput
                            placeholder='name'
                            onChangeText={(title) => setLocalState({...localState,title})}
                            value={localState.title}
                            inputStyle={{color:'black'}}
                        />
            <TextInput
                            placeholder='description'
                            onChangeText={(description) => setLocalState({...localState,description})}
                            value={localState.description}
                        />
             <TextInput
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
           
             <Button
                    onPress={() => {
                        showHazards(props.latitude.toString());
                    }}
                    color='#5637DD'
                    title='Show Hazards'
                        />
                
            
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHazard);