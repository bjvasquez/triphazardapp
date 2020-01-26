import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { NewHazard } from './NewHazard';
import {connect} from 'react-redux';
import {newHazard} from '../redux/ActionCreators';


const mapStateToProps = (state,props) => {
  return {
      ...props,
      user: state.loginUpdater.user,
      numberOfHazards: state.hazards.numberOfHazards,
      hazards: state.hazards.hazards
  };
};

const mapDispatchToProps = {
  newHazard: hazard => (newHazard(hazard))
};

class HazardImage extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          imageUrl: null,
          region: {
            latitude: 30.26,
            longitude: -97.1,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        } 
      };
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

  render() {

    return (
      <View style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Add new hazard from camera roll"
          onPress={this.pickImage}
        />
        <Button
          title="Add new hazard from camera"
          onPress={this.getImageFromCamera}
        />
        <NewHazard src={this.state.imageUrl} latitude={this.state.region.latitude} 
        hazards={this.props.hazards} longitude={this.state.region.longitude}
        newHazard={this.props.newHazard} />

        {this.state.imageUrl &&
          <Image source={{ uri: this.state.imageUrl }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.setState({imageUrl: capturedImage.uri});
            }
        }
    }

    pickImage = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        
        // if (cameraPermission !== 'granted') {
        //     alert('Permission to access the camera is required');
        // }
        // if (cameraRollPermission !== 'granted') {
        //     alert('Permission to access the camera roll is required');
        // }  
    
        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if (!result.cancelled) {
                console.log(result);
                this.setState({ imageUrl: result.uri });
            }
        }
    };
  
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HazardImage);