import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import { Icon, Button, Spinner} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as actionLogin from '../redux/actions/actionLogin';


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      submitDisabled : true,
      securePass: true,
      regEmail: false,
      regPass: false,
      signIn: false
    }
  }

  onHandleEmail = (text) => {
    this.setState({email: text})
  }
  onHandledPassword = (text) => {
    this.setState({password: text})
  }
  renderBottomComponent = () => {
    if(this.state.signIn){
        return (
            <Spinner color='#df7599' size='small' />
        )
    }
  }

  showHideIcon = () => {
    this.setState({
      securePass: !this.state.securePass
    });
  }

  regexLogin(inputForm) {
    if (inputForm == 'email') {
        let correct = this.state.email.match(/(^[a-zA-Z]+|^[0-9]+|^[a-zA-Z0-9\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)/g)
        if (correct != null) {
            this.state.regEmail = true
        } else {
            this.state.regEmail = false
        }
    } else if (inputForm == 'password') {
        if (this.state.password !== '') {
            this.state.regPass = true
        } else {
            this.state.regPass = false
        }
    }
    
    if (this.state.regEmail == true && this.state.regPass == true) {
        this.setState({submitDisabled: false})
    } else {
        this.setState({submitDisabled: true})
    }
  }

  login= async() =>{
    this.setState({ signIn: true })
    const email = String(this.state.email).toLowerCase()
    const password = String(this.state.password)
    await this.props.handleLogin(email,password)
    const users = this.props.loginLocal.login
      if(users.token){
        await AsyncStorage.multiSet([
          ['token', users.token],
          ['id', `${users.id}`],
          ['name', users.name]
        ])
        this.setState({ signIn: false })
        console.log(users.name)
        console.log(users.id)
        this.props.navigation.navigate('Home')
      }else{
        this.setState({ signIn: false})
        alert('Invalid Email or Password')
      }      
    }
 

  render() {
    console.disableYellowBox = true
    return (
      
        <View style={styles.container}>
          <LinearGradient colors={['#fc4a1a','#f7b733']} style={styles.gradient} >
          
            <View style={styles.title}>
              <Image source={require('../img/sky.png')} style={styles.logo} />
            </View>
          
            <View style={styles.form}>
              <Text style={styles.labelEmail}>Email</Text>

              <TextInput style={styles.inputBox}
                keyboardType="email-address"
                autoCapitalize='none'
                onChangeText={(text) => this.onHandleEmail(text)}
                onKeyPress={() => this.regexLogin('email')}
                value={this.state.email} />
            
              <Text style={styles.labelPass}>Password</Text>
        
              <View style={styles.inputBoxPass}>
                <TextInput style={styles.inputPass}
                secureTextEntry={this.state.securePass}
                onChangeText={(text) => this.onHandledPassword(text)}
                onKeyPress={() => this.regexLogin('password')}
                autoCapitalize='none'
                value={this.state.password} />
                <Button onPress={this.showHideIcon} transparent>
                  <Icon type="FontAwesome" name={this.state.securePass ? "eye-slash":"eye"} />
                </Button>
                
              </View>
            
              <TouchableOpacity style={styles.buttonSign} onPress= {() => this.login()}

              // disabled={this.state.submitDisabled} 
              >

              <Text style={styles.buttonText}>Log In</Text>

              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonReg} onPress={() => this.props.navigation.navigate('Register')} >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              {this.renderBottomComponent()}
            </View>
  
          </LinearGradient>
        </View>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    loginLocal: state.login
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (email,password) => dispatch(actionLogin.handleLogin(email,password))
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  gradient:{
    flex:1
  },
  logo:{
    width:150,
    height:200,
    marginTop:20
  },
  title:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  titleLogin:{
    fontSize:48,
    marginTop:20,
  },
  titleTxt:{
    marginTop:30,
    fontSize:18,
  },
  form:{
    flex:2,
    marginTop:20,
    alignItems:'center',
  },
  labelEmail:{
    fontSize:20,
    marginRight:250,
  },
  inputPass:{
    flex:8,
    fontSize:18,
    paddingHorizontal:16,
  },
  labelPass:{
    fontSize:20,
    marginRight:200,
  },
  inputBox: {  
    width:300,
    backgroundColor:'white',
    paddingHorizontal:16,
    fontSize:18,
    color:'#000',
    marginVertical: 10,
    borderColor:'black',
    borderWidth:2,
    borderRadius:15
    },
  inputBoxPass:{
    width:300,
    backgroundColor:'white',
    flexDirection:'row',
    borderColor:'black',
    borderWidth:2,
    borderRadius:15
  }, 
  eye:{
    fontSize:24,
    paddingRight:12,
    paddingTop:12,
  },
  buttonSign: { 
    width:300,
    backgroundColor:'#fc4a1a',
    marginTop: 40,
    paddingVertical: 13,
    borderRadius:15
    },
  buttonReg:{
    width:300,
    backgroundColor:'#fd1d1d',
    marginBottom: 10,
    marginTop:20,
    paddingVertical: 13,
    borderRadius:15
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
    }
})

// export default Login;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);