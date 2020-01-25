import React, {Component} from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 
import {connect} from 'react-redux';
import Hazards from './Hazards';
import HazardImage from './HazardImageComponent';
import {createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const mapStateToProps = state => {
    return {
        user: state.loginUpdater.user,
    };
};

const MapNavigator = createStackNavigator(
  {
      Map: { screen: Hazards }
  },
  {
      navigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: '#5637DD'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: '#fff'
          }
      })
  }
);

const NewHazardsNavigator = createStackNavigator(
  {
      NewHazards: { screen: HazardImage }
  },
  {
      navigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: '#5637DD'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: '#fff'
          }
      })
  }
);

const MainNavigator =  createAppContainer(createDrawerNavigator(
  {
      Map: {
          screen: MapNavigator
      },
      NewHazards: {
          screen: NewHazardsNavigator
      }},
  {
      initialRouteName: 'Map',
      drawerBackgroundColor: '#CEC8FF',
      
  }
));

 export const Home = (props) => {
    let numberOfHazards = 5;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trip Hazard App</Text>            
            <Text style={styles.text}>{numberOfHazards} hazard(s) have been reported.</Text>
            <Text style={styles.text}>Add new hazard by using the camera or picking from your camera roll.</Text>
            {/* <HazardImage /> */}
            <MainNavigator />
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