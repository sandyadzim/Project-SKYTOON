import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, Image, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native'
import { Header, Left, Right, Icon, Body, Fab, Card } from 'native-base';
import { connect } from 'react-redux';
import * as actionWebtoons from '../redux/actions/actionWebtoon';

class MyToon extends Component {

    constructor(props){
        super(props);
        this.state = {
            myWebt :  [{
                title: 'Suddenly, I Became A ....',
                image: 'https://cdn.idntimes.com/content-images/community/2019/05/whoprincess-tt-53769c23d1701756a652a7c2cfc9ac68.png',
                episode: '32 Episode(s)'
                }, {
                title: 'Weak Hero',
                image: 'https://cdn.idntimes.com/content-images/community/2019/05/screenshot-20190509-150510-6328b0ae32223577bdbd43da853762d1.png',
                episode: '20 Episode(s)'
                },
                {
                title: 'Killstagram',
                image: 'https://cdn.idntimes.com/content-images/community/2019/05/screenshot-20190509-145620-43ff1dab6072ada62ba43e14321a87ef.png',
                episode: '42 Episode(s)'
                }],
            active: false,  
        };
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')        
        const id = await AsyncStorage.getItem('id')
        console.log(id)
        this.props.handleGetUserWebtoon({
          user_id: id,
          token: token
        })
    }
    onHandleDetail(item){
        this.props.navigation.navigate('EditWebtoon', this.props.webtoonLocal.webtoon[item.id - 1])
        console.log(this.props.webtoonLocal.webtoon[item.id - 1])
    }

    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.bar}>
                    <Left>
                        <Icon name='arrow-back' style={styles.iconBack} onPress={()=>this.props.navigation.navigate(this.props.navigation.getParam('prevScreen'))} />
                    </Left>
                    <Body>
                        <Text style={styles.title}>My Webtoon</Text>
                    </Body>
                    <Right></Right>
                </Header>

                <View style={styles.cont}>                  
                    <ScrollView>                    
                        <FlatList 
                        // data={this.state.myWebt}
                        data={this.props.mytoonLocal.webtoonUser}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                            <Card style={styles.paddImg}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditWebtoon', {prevScreen:'MyToon', id: item.id, title: item.title, image: item.image})}>
                                    <Image source={{uri : item.image}} style={styles.imgList} />
                                </TouchableOpacity>
                                <View style={styles.titleImg}>
                                    <Text style={styles.txtTitle}>{item.title}</Text>
                                    <Text style={styles.txtEpisode}>{item.genre}</Text>
                                {console.log(this.props.mytoonLocal.webtoonUser)}
                                </View>
                            </Card>
                            }
                            keyExtractor={(item, index) => index.toString()
                            }
                            />       
                    </ScrollView>
                    <View style={styles.flx}>
                        <Fab
                            active={this.state.active}
                            direction="up"
                            containerStyle={{ }}
                            style={{ backgroundColor: '#fc4a1a' }}
                            position="bottomRight"
                            onPress={() => this.setState({ active: !this.state.active })}>
                            <Icon name="add" onPress={() => this.props.navigation.navigate('CreateMyToon', {prevScreen: 'MyToon'})} />
                        </Fab>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
      mytoonLocal: state.webtoon
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleGetUserWebtoon: (params) => dispatch(actionWebtoons.handleGetUserWebtoon(params))
    }
  }
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    bar:{
        backgroundColor : '#fc4a1a'
    },
    title:{
        fontSize:24,
        color:'white'
    },
    iconBack:{
        color:'white'
    },
    imgList:{
        width:100,
        height:100,
        borderColor:'white',
        borderWidth:2,
        marginVertical:10,
        borderRadius:10
    },
    paddImg:{
        paddingHorizontal:20,
        flexDirection:'row',
        backgroundColor:'#fc4a1a',
        borderRadius:10,
        width:'90%',
        alignSelf:'center'
    },
    titleImg:{
        paddingLeft:10,
        marginVertical:10
    },
    txtTitle:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },
    txtEpisode:{
        fontSize:16,
        marginTop:10,
        color:'white'
    },
    flx:{
        flex:1
    },
    cont:{
        flex:1
    }
})

// export default MyToon;
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyToon);