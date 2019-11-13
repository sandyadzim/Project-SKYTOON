import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Header, Left, Right, Icon, Body, } from 'native-base';
import ImagePicker from 'react-native-image-picker';

class ProfilEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            avatar: this.props.navigation.getParam('avaPic'),
            name: this.props.navigation.getParam('name')
        }
    }
    
    imagePickerHandler() {
        const options = {
          title: 'Select Avatar',
          customButton: [{
            name: 'fb',
            title: 'Choose Photo From Facebook'
          }],
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        }
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response =', response);
    
            if (response.didCancel) {
                console.log('User Cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const source = { uri: response.uri }
            
            this.setState({
              avatar: source,
            })
          }
        })
      }
    render() {
        return (
            <View>
                <View>
                    <Header style={styles.bar}>
                        <Body>
                            <Text style={styles.txtHeader}>Edit Profile</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {name: this.state.name, avaPic: this.state.avatar})} >
                                <Icon name='checkmark' style={styles.iconCheck} />
                            </TouchableOpacity>
                        </Right>
                    </Header>

                    <View style={styles.content}>
                        <Image source={this.state.avatar} style={styles.profilePictureImage} />
                        <TouchableOpacity onPress={()=> this.imagePickerHandler()} >
                            <Icon name='camera' style={styles.iconCam} />
                        </TouchableOpacity>
                        <TextInput 
                           value={this.state.name}
                           onChangeText={(text) => this.setState({name: text})}
                           style={styles.input}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profilePictureImage: {
        width: 150,
        height: 150 ,
        borderRadius: 140,
        alignSelf:'center'
      },
    bar:{
        backgroundColor: '#fc4a1a'
    },
    txtHeader:{
        fontSize:24,
        color:'white'
    },
    iconCheck:{
        fontSize:36,
        color:'white'
    },
    content:{
        marginTop:20,
    },
    iconCam:{
        fontSize:50,
        alignSelf:'center'
    },
    input:{
        borderColor:'black',
        borderWidth:3,
        width:'70%',
        alignSelf:'center',
        fontSize:24,
        textAlign:'center'
    }
})
export default ProfilEdit;