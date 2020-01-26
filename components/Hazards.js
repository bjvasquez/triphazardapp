import React, {Component, useState} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, TextInput, Dimensions, Image} from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView,{Marker} from 'react-native-maps';


const mapStateToProps = state => {
  return {
      numberOfHazards: state.hazards.numberOfHazards,
      hazards: state.hazards.hazards
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
    markerStyle: {
      width: Dimensions.get('window').width*0.5,
      height: Dimensions.get('window').height*0.5,
      backgroundColor:'white',
    },
    image:{
        flex:1,
        width: Dimensions.get('window').width*0.5,
        height: Dimensions.get('window').height*0.2,
        resizeMode:'contain',

    }
  });

 
       
class Hazards extends Component {
    constructor(props){
    super(props);
    this.state = {
        region: {
            latitude: 30.26,
            longitude: -97.1,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.warn(position);
            var region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            };
            this.setState({region});
          },
          (error) => alert(error.message),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )};
    
      
      onRegionChange(region) {
        this.setState({ region });
      }
      

    render(){
    return (
        <View style={styles.container}>
            <MapView 
                style={styles.mapStyle} 
                region={this.state.region}
                onRegionChange={()=>this.onRegionChange.bind(this)}>
                    {this.props.hazards.map(marker => (
                    <Marker
                    coordinate={marker.coordinates}
                    title={marker.title}
                    description={marker.description} >
                        <MapView.Callout tooltip={true} >
                            <View style={styles.markerStyle}>
                                   <Text>
                                       {marker.title}
                                       {marker.description}
                                   </Text>
                                <Text>
                                <Image 
                                        style={styles.image}
                                        source={require('../assets/hazard1.jpg')}
                                        resizeMethod='auto'
                                        />
                                </Text>
                                
                            </View>    
                        </MapView.Callout>  
                    </Marker> ))}
            </MapView>
      </View>
    )
}
    }

export default connect(mapStateToProps, mapDispatchToProps)(Hazards);