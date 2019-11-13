import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';


import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Favorit from '../screen/Favorit';

const BottomTabNavigator = createMaterialBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'For You',
            tabBarIcon : ({tintColor}) => (
                <Icon name='home' size={20} color={(tintColor)} />
            )
        }
    },
    Favorit: {
        screen: Favorit,
        navigationOptions: {
            tabBarLabel: 'Favorit',
            tabBarIcon: ({tintColor}) => (
                <Icon name='star' size={20} color={(tintColor)} />
            )
        }
    },
    Profile:{
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
                <Icon name="user" size={20} color={(tintColor)} />
            )
        }
    },
},

{    
    initialRouteName: 'Home',
    tabBarOptions:{
        activeTintColor:'#fff',
        // inactiveTintColor:'red',
        // style:{backgroundColor:'red'}
    },
    barStyle:{backgroundColor:'#fc4a1a'}
    // activeTintColor: '#fff',  
    // inactiveTintColor: '#000',  
    // barStyle: { backgroundColor: '#4287f5' },  
  }, 
)


export default createAppContainer(BottomTabNavigator);