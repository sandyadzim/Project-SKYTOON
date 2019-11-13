import React, {Component} from 'react'
import {View, AsyncStorage, StyleSheet, Image, SafeAreaView} from 'react-native'
import {Text, Spinner}from 'native-base'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import * as actionWebtoon from '../redux/actions/actionWebtoon'



class Loading extends Component{
  componentDidMount(){
    setTimeout( async () => {
      const token = await AsyncStorage.getItem('token')
      if (token == null) {
        this.props.navigation.navigate('Login')
      } else {
        await this.props.handleGetWebtoon()
        this.props.navigation.navigate('Home')
      }
    }, 3000);   
  }

    render(){
        return(
            <SafeAreaView style={styles.container}>
              <LinearGradient colors={['#fc4a1a','#f7b733']} style={styles.gradient}>
              <Image source={require('../img/skytoonn.png')} style={styles.logo} />
              <Spinner color='#f18c8e' />
              </LinearGradient>                
            </SafeAreaView>
        )
    }
}
  
  const mapStateToProps = state => {
    return {
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      handleGetWebtoon: () => dispatch(actionWebtoon.handleGetWebtoon())
    }
  }
  
  const styles = StyleSheet.create({
    logo:{
      width: 150,
      height:200,
      alignSelf:'center',
      
    },
    container:{
      flex:1
    },
    gradient:{
      flex:1,
      justifyContent:'center'
    }
  })
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Loading);