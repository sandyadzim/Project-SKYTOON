import React, { Component } from 'react';
import { View, Text,TouchableOpacity, Image, StyleSheet, AsyncStorage} from 'react-native';
import { Right, Header, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
// import console = require('console');

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            avatar: this.props.navigation.getParam('avaPic'),
            name: this.props.navigation.getParam('name')
        };
    }

    signOut = () => {
        AsyncStorage
        .clear()
        .then(() => {
            this.props.navigation.navigate('Login')
        })
        .catch(e => {
            console.log(e)
            alert('Error: Cannot Sign Out')
        })
    }
    async componentDidMount () {
        const name = await AsyncStorage.getItem('name')
        this.setState({name})
    }

    render() {

        if(!this.state.name){
            this.setState({
                name: 'Anonim',
                avatar: require('../img/img_299586.png'),
            })
        }

        return (
            <View>
                <Header style={styles.bar}>
                    <Left>
                        <Text style={styles.prof}>Profile</Text>
                    </Left>
                    <Right>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilEdit', {name: this.state.name, avaPic: this.state.avatar})} >
                            <Icon name='pencil' style={styles.iconE} />
                        </TouchableOpacity> */}
                    </Right>
                </Header>

                <View>
                    <View>
                        <Image source={this.state.avatar} style={styles.img} />
                    </View>
                    <View style={styles.name}>
                        <Text style={styles.txtName}>{this.state.name}</Text>
                    </View>
                </View>

                <View>
                    <View>
                        <TouchableOpacity style={styles.create} onPress={() => this.props.navigation.navigate('MyToon', {prevScreen: 'Profile'})}>
                            <Text style={styles.txtCre}>
                                My Webtoon Creation
                            </Text>
                            <Icon name='arrow-right' style={styles.iconArrow} />
                        </TouchableOpacity>
                        
                    </View>
                    <View>
                        <TouchableOpacity style={styles.logout} onPress={() => this.signOut()} >
                            <Text style={styles.txtLog}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar:{
        backgroundColor: '#fc4a1a'
    },
    prof:{
        fontSize:22,
        color:'white'
    },
    iconE:{
        fontSize:28,
        paddingRight:5,
        color:'white'
    },
    img:{
        width:200,
        height:200,
        alignSelf:'center',
        marginTop:15,
        borderRadius:200/2
    },
    name:{
        alignItems:'center',
        marginTop:25,
        
    },
    txtName:{
        fontSize:32
    },
    create:{
        borderColor:'white',
        borderWidth:2,
        flexDirection:'row',
        backgroundColor:'#fcb045'
    },
    logout:{
        borderColor:'white',
        borderWidth:2,
        borderTopWidth:0,
        backgroundColor:'#fd1d1d'
    },
    txtCre:{
        fontSize:24,
        paddingVertical:10,
        paddingLeft:10,
        flex:8
    },
    txtLog:{
        fontSize:24,
        paddingVertical:10,
        paddingLeft:10,
        fontWeight:'bold'
    },
    iconArrow:{
        fontSize:24,
        marginTop:15,
        marginRight:10
    },
})
export default Profile;