import React, {Component} from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 
//import {Form} from 'react-native-elements'; 
import {connect} from 'react-redux';
import Hazards from './Hazards';
import HazardImage from './HazardImageComponent';

const mapStateToProps = state => {
    return {
        user: state.loginUpdater.user,
    };
};

 export const Home = (props) => {
    let numberOfHazards = 5;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trip Hazard App</Text>            
            <Text style={styles.text}>{numberOfHazards} hazard(s) have been reported.</Text>
            <Text style={styles.text}>Add new hazard by using the camera or picking from your camera roll.</Text>
            <HazardImage />
            {/* <Hazards /> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'skyblue'
    },
    title: {
        
        fontSize: 30,
        padding: 20
      },
    text: {
        
        fontSize: 14,
        margin: 20
      }, 
    picker: {
      flex: .5,
      backgroundColor: 'skyblue'
      },
  });



export default connect(mapStateToProps)(Home);