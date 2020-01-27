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
            src: props.src,
            description: 'test',
            date: '',
            coordinates: {
                latitude: props.latitude,
                longitude: props.longitude,
              }
    
        },});
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
                            onChangeText={(title) => setLocalState({...localState,title:title})}
                            value={localState.title}
                            inputStyle={{color:'black'}}
                        />
            <TextInput
                            placeholder='description'
                            onChangeText={(description) => setLocalState({...localState,description:description})}
                            value={localState.description}
                        />
             <TextInput
                            placeholder='date'
                            onChangeText={(date) => setLocalState({...localState,date:date})}
                            value={localState.date}
                        />
         
            <Button
                        onPress={() => {
                            props.newHazard(localState.hazard);
                            resetForm();
                        }}
                        color='#5637DD'
                        title='Submit'
                    />
           
             <Button
                    onPress={() => {
                        showHazards(props.hazards[props.hazards.length-1].description.toString());
                    }}
                    color='#5637DD'
                    title='Show Hazards'
                        />
                
            
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewHazard);