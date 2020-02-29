import React, {Component, useState} from 'react'; 
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet, Button, TextInput, Dimensions, Image} from 'react-native';
import { Card, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView,{Marker} from 'react-native-maps';
import { hazardUpdater } from '../redux/hazardUpdater';
import {newHazard, updateHazards} from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
      numberOfHazards: state.hazards.numberOfHazards,
      hazards: state.hazards.hazards
  };
};

const mapDispatchToProps = {
    loginSuccess: userInfo => (loginSuccess(userInfo)),
    loginFailed: errMessage => (loginFailed(errMessage)), 
    updateHazards: hazard => (updateHazards(hazard)), 
    newHazard: hazard => (newHazard(hazard))
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
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
          )
            this.fetchHazards();
          
            this.interval = setInterval(this.fetchHazards,30000)
    };
    

      fetchHazards = () => {
        fetch('http://54.173.196.126:3000/hazards', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }}).then((response) => response.json())
            .then((responseJson) => {
              if(this.props.numberOfHazards !== responseJson.length){
                this.props.updateHazards(responseJson)
              }
            
            return responseJson;
            })
            .catch((error) => {
            console.error(error);
            })
          }


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
                    coordinate={{latitude:marker.latitude, longitude: marker.longitude}}
                    title={marker.title}
                    description={marker.description} >
                        <MapView.Callout tooltip={true} >
                            <View style={styles.markerStyle}>
                                   <Text>
                                       {marker.title}
                                       {marker.description}
                                       {marker.id}
                                   </Text>
                                <Text>
                                <Image 
                                        style={styles.image}
                                        source={{uri:'../assets/hazard1.jpg'}}
                                        resizeMethod='auto'
                                        />
                                {/* <Image source={{ uri: marker.src }}
                                 style={{ width: 200, height: 200 }} 
                                 />}
       */}
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