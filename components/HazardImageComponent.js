import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class HazardImage extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          imageUrl: null
      };
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

export default HazardImage;