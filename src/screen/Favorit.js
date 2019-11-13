import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Input, Item, Icon, Card, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as actionWebtoons from '../redux/actions/actionWebtoon';
import * as actionFav from '../redux/actions/actionFav';

class Favorit extends Component {

    constructor(props){
        super(props);
        this.state = {
            favCard :  [{
                title: 'Suddenly, I Became A ....',
                image: 'https://cdn.idntimes.com/content-images/community/2019/05/whoprincess-tt-53769c23d1701756a652a7c2cfc9ac68.png',
                rating: '100+ Favourite'
                }, {
                title: 'Weak Hero',
                image: 'https://cdn.idntimes.com/content-images/community/2019/05/screenshot-20190509-150510-6328b0ae32223577bdbd43da853762d1.png',
                rating: '90 Favourite'
                },
                {
                title: 'Killstagram',
                image: 'https://cdn.idntimes.com/content-images/community/2019/05/screenshot-20190509-145620-43ff1dab6072ada62ba43e14321a87ef.png',
                rating: '80 Favourite'
                }],
        };
    }
    componentWillMount = async () => {
        // AsyncStorage.getItem('token')
        const id = await AsyncStorage.getItem('id')
        await this.props.handleFavorite({
            user_id: id
        })        
    }

    unFav = async (favourite_id, webtoon_id) => {
        const token = await AsyncStorage.getItem('token')
        const id = await AsyncStorage.getItem('id')
        await this.props.handleDelFav({
            user_id: id,
            webtoon_id: webtoon_id,
            favourite_id: favourite_id,
            token: token
        })
        alert('Unfavourite Success')
        await this.props.handleFavorite({
            user_id: id
        })
    }

    render() {
        if(this.props.favLocal.isLoading == true){
            return (
                <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                    <Spinner color='#f18c8e' />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                

                    <View style={styles.search}>
                        <Item>
                            <Input placeholder='Search' />
                            <Icon name='search' style={styles.iconSearch} />
                        </Item>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>                   
                            <FlatList 
                            // data={this.state.favCard}
                            data={this.props.favLocal.fav}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>
                            
                            <Card style={styles.paddImg}>
                                <TouchableOpacity  
                                onPress={() => this.props.navigation.navigate('Details', {prevScreen: 'Favorit', id: item.webtoonId.id, image: item.webtoonId.image, title: item.webtoonId.title})}
                                >
                                    <Image source={{uri : item.webtoonId.image}} style={styles.imgList} />
                                </TouchableOpacity>
                                <View style={styles.titleImg}>
                                    <Text style={styles.txtTitle}>{item.webtoonId.title}</Text>
                                    <Text style={styles.txtRating}>{item.webtoonId.genre}</Text>
                                    <TouchableOpacity onPress={() => this.unFav(item.id, item.webtoon_id)}>                                       
                                        <Text style={{textAlign:'center', backgroundColor:'white', paddingTop:6,height:30, width:90, borderRadius:5}}>Unfavourite</Text>                                        
                                    </TouchableOpacity>
                                </View>
                                {/* {console.log(item.webtoon_id)} */}
                            </Card>
                            
                            }
                            keyExtractor={(item, index) => index.toString()
                            }
                            />
                            
                            </View>
                    </ScrollView>

                
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
      favLocal: state.fav,
      webtoonLocal: state.webtoon
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleFavorite: (params) => dispatch(actionFav.handleGetFav(params)),
        handleDelFav: (params) => dispatch(actionFav.handleDelFav(params)),
        handleGetWebtoon: (params) => dispatch(actionWebtoons.handleGetWebtoon(params))
    }
  }
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    gradient:{
        flex:1
    },
    search:{
        borderColor:'black',
        borderWidth:2,
        marginHorizontal:20,
        marginVertical:5
    },
    iconSearch:{
        paddingRight:20,
        fontSize:30
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
        marginVertical:10,
        paddingLeft:10,
    },
    txtTitle:{
        fontSize:20,
        fontWeight:'bold'
    },
    txtRating:{
        fontSize:16,
        fontStyle: 'italic',
        marginBottom: 5
    }
})

// export default Favorit;
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Favorit);