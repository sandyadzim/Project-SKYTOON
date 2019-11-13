import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Input, Item, Icon, Card } from 'native-base';
import Slideshow from 'react-native-image-slider-show';
import { connect } from 'react-redux';
import * as actionWebtoons from './../redux/actions/actionWebtoon';
import * as actionFav from './../redux/actions/actionFav'


export class Home extends Component {
    constructor(){
        super()
        this.state = {
            position: 1,
            time: null,
            banners: [{
                title: 'Suddenly, I Became A Princess',
                url: 'https://cdn.idntimes.com/content-images/community/2019/05/whoprincess-tt-53769c23d1701756a652a7c2cfc9ac68.png'
                }, {
                title: 'Weak Hero',
                url: 'https://cdn.idntimes.com/content-images/community/2019/05/screenshot-20190509-150510-6328b0ae32223577bdbd43da853762d1.png'
                }, {
                title: 'Killstagram',
                url: 'https://cdn.idntimes.com/content-images/community/2019/05/screenshot-20190509-145620-43ff1dab6072ada62ba43e14321a87ef.png'
            }],
            favCard :  [{
                title: 'Suddenly, I Became A Princess',
                image: 'https://cdn.idntimes.com/content-images/community/2019/05/whoprincess-tt-53769c23d1701756a652a7c2cfc9ac68.png'
                }, {
                title: 'Weak Hero',
                image: 'https://cdn.idntimes.com/content-images/community/2019/05/screenshot-20190509-150510-6328b0ae32223577bdbd43da853762d1.png'
                }, {
                title: 'Killstagram',
                 image: 'https://cdn.idntimes.com/content-images/community/2019/05/screenshot-20190509-145620-43ff1dab6072ada62ba43e14321a87ef.png'
             }],
            listImg: [{
                title: 'Suddenly, I Be...',
                image: 'https://scontent-frx5-1.cdninstagram.com/vp/9f4cd15cd5ee27153ee0b57b2ac58a99/5DC96E1B/t51.2885-15/e35/60613310_142726766846155_1219225289482409942_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&se=7&ig_cache_key=MjA1NjAwOTc1NTU3MjE5MzE5OQ%3D%3D.2'
            }, {
                title: 'Weak Hero',
                image: 'https://swebtoon-phinf.pstatic.net/20190510_60/1557483841879d0gpe_JPEG/thumb_ipad.jpg'
            }, {
                title: 'Killstagram',
                image: 'https://scontent.cdninstagram.com/vp/3797512605f04d3b06b9820856814ccc/5DF0840D/t51.2885-15/e35/c12.0.691.691a/s480x480/67701751_461633028018523_2145113131653080542_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com'
            }],
        }
    }

    componentWillMount(){
        this.setState({
            time: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.banners.length - 1 ? 0 : this.state.position + 1
                });
            }, 3000)
        });
    }
    onPressFavHor = (item) => {
        navigation.navigate('Details', 'dataToon : item')
    }

    componentWillUnmount(){
        clearInterval(this.state.time)
    }
    
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        const id = await AsyncStorage.getItem('id')
        console.log(token)
        // console.log(id)
        await this.props.handleGetWebtoon()
    }

    onHandleDetail(item){
        // this.props.navigation.navigate('Details', this.props.webtoonLocal.webtoon[item.id - 1])
        this.props.navigation.navigate('Details', {
            id : item.id,
            title: item.title,
            genre: item.genre,
            image: item.image,
            prevScreen: 'Home' })
        
        
    }

    addFav = async (webtoon_id) => {
        const token = await AsyncStorage.getItem('token')
        const id = await AsyncStorage.getItem('id')

        await this.props.handleAddFav({
            user_id: id,
            webtoon_id: webtoon_id,
            token: token
        })
        alert('Add Success')

    }

    render() {
        return (
                <View style={styles.container}>
                    <LinearGradient colors={['#fd1d1d','#fcb045']} style={styles.gradient}>

                        <ScrollView>
                            <View style={styles.start}>
                                <Item>
                                    <Input placeholder='Search' style={styles.search} />
                                    <Icon name="search" style={styles.iconSearch} />
                                </Item>
                            </View>

                            <View style={styles.slide}>
                                <Slideshow
                                    height={150}
                                    overlay={true}
                                    arrowSize={0}
                                    indicatorSelectedColor="#fc4a1a"
                                    titleStyle={{color : "white"}}
                                    dataSource={this.props.webtoonLocal.webtoon}
                                    position={this.state.position}
                                    onPositionChanged={position => this.setState({ position })}
                                />
                            </View>

                            <View style={styles.favorite}>
                                <Text style={styles.txtFav}>Favorite</Text>
                                    
                                
                                    <View style={styles.backList} >
                                        <FlatList
                                        // data={this.state.favCard}
                                        data={this.props.webtoonLocal.webtoon}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({item}) =>
                                        <TouchableOpacity onPress={()=>this.onHandleDetail(item)}>
                                            <View style={styles.list}>
                                                <Image style={styles.imagelist} source={{uri : item.image}}/>
                                                <View style={styles.boxImg}>
                                                    <Text style={styles.txtFavList}>{item.title}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        }
                                        keyExtractor={(item, index) => index.toString()
                                        }/>
                                        
                                    </View>
                                    
                                
                            </View>

                            <View style={styles.viewAll}>
                                <Text style={styles.txtAll}>All</Text>
                            </View>
                        
                        
                            <View style={styles.all}>
                                
                                <View>
                                    <FlatList
                                    data={this.props.webtoonLocal.webtoon}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item}) =>
                                    
                                        <Card style={styles.wrapAll}>
                                            <TouchableOpacity onPress={()=>this.onHandleDetail(item)}>
                                                <Image style={styles.imagelistAll} source={{uri : item.image}}/>
                                            </TouchableOpacity>
                                            
                                            <View style={styles.viewTxtAll}>
                                                <Text style={styles.txtAllList}>{item.title}</Text>
                                                <TouchableOpacity style={styles.btnFav}  onPress={() => this.addFav(item.id)} >
                                                    <Text style={styles.txtBtnFav}>+ Favorite</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Card>  

                                    }
                                    keyExtractor={(item, index) => index.toString()
                                    }/>
                                </View>
                            </View>
                        
                        </ScrollView>
                    </LinearGradient>
                        
                </View>      
        );
    }
}

const mapStateToProps = state => {
    return {
      webtoonLocal: state.webtoon,
      localFav: state.fav
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleGetWebtoon: () => dispatch(actionWebtoons.handleGetWebtoon()),
        handleAddFav: (params) => dispatch(actionFav.handleAddFav(params)),
        handleFavorite: (params) => dispatch(actionFav.handleGetFav(params))
    
    }
  }

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    gradient:{
        flex:1
    },
    start:{
        borderColor:'white',
        borderWidth:2,
        marginHorizontal:20,
        marginVertical:5
    },
    search:{
        fontSize:18,
    },
    iconSearch:{
        fontSize:20,
        marginRight:10,
        fontSize:30,
        color:'white'
    },
    slide:{
        marginHorizontal:20,
        marginVertical:10,
        borderColor:'white',
        borderWidth:2,
    },
    favorite:{
        marginHorizontal:20,
        marginVertical:10,
    },
    txtFav:{
        fontSize:18,
        fontWeight:'bold',
        color:'black'
    },
    txtFavList:{
        color:'white',
        textAlign:'center'
    },
    all:{
        marginHorizontal:20,
        // backgroundColor:'#111',
        // width:'80%',
        
    },
    list:{
        marginLeft:10, 
    },
    imagelist : {
        width: '100%', 
        height:120,
        borderColor:'white',
        borderWidth:3,    
    },
    boxImg:{
        width:150,
    },
    viewAll:{
        marginLeft:20,
    },
    txtAll:{
        fontSize:18,
        fontWeight:'bold',
        color:'black'
    },
    txtAllList:{
        fontSize:16,
        marginLeft:10,
        color:'white'
    },
    wrapAll:{
        flexDirection:'row',
        paddingTop: 10,
        backgroundColor:'#fc4a1a',
        borderRadius:10,
        borderColor:'#fc4a1a'
    },
    imagelistAll:{
        width:60,
        height:60,
        borderColor:'white',
        borderWidth:2,
        borderRadius:10,
        marginLeft:10,
        marginBottom:10
    },
    viewTxtAll:{
        
    },
    btnFav:{
        marginLeft:10,
        paddingLeft:10,
        marginRight:20,
        marginTop:5,   
        width:90,
    },
    txtBtnFav:{
        backgroundColor:'#F0CB35',
        borderColor:'black',
        borderWidth:1,
        paddingLeft:5,
        borderRadius:10,
        fontWeight:'bold'
    },
    listAll:{
        backgroundColor:'tomato'
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);
// export default Home;