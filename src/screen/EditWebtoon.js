import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Header, Left, Icon, Body, Right, Card } from 'native-base';
import { connect } from 'react-redux';
import * as actionEpisode from '../redux/actions/actionEpisode';



class CreateMyToon extends Component {
    constructor(props){
    super(props);
    this.state ={
        imgEps: [
            {
              id: 0,
              title: 'Episode 1',
              url: 'https://swebtoon-phinf.pstatic.net/20190510_197/15574834210125sRID_JPEG/thumb_M.jpg',
              lastUpdate: '1 Oktober 2019'
            },
            {
              id:1,
              title: 'Episode 2',
              url: 'https://www.beartai.com/wp-content/uploads/2019/05/2019-05-20-17_50_19-Ep.3-4-_-Killstagram-Opera-477x600.png',
              lastUpdate: '2 Oktober 2019'
            },
            {
              id:2,
              title: 'Episode 3',
              url: 'https://swebtoon-phinf.pstatic.net/20181113_69/15420983361712Pbom_JPEG/thumb_ipad.jpg',
              lastUpdate: '3 Oktober 2019'
            },
            {
                id: 3,
                title: 'Episode 4',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfd5Ku6Ey7CFiQ2SDlTeN_p70sDVwBHSUirn-43Lysx9ey6Ibn',
                lastUpdate: '4 Oktober 2019'
            },
          ]
    }
}

componentDidMount() {
    setTimeout(async () => {
      const idWebtoon = this.props.navigation.getParam('id')
      await this.props.handleGetEpisode(idWebtoon)
    }, 1000)
  }

    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Icon name='arrow-back' style={styles.iconBack} onPress={() => this.props.navigation.navigate(this.props.navigation.getParam('prevScreen'))} />
                    </Left>
                    <Body>
                        <Text style={styles.txtBar}>Edit Webtoon</Text>
                    </Body>
                    <Right>
                        <Icon name='checkmark' style={styles.iconCheck} onPress={() => this.props.navigation.navigate('MyToon')} />
                    </Right>
                </Header>

                <View style={styles.viewInput}>
                    <Text style={styles.titleInput}>Title</Text>
                    <TextInput  placeholder='Search' style={styles.input} value={this.props.navigation.getParam('title')} />
                </View>

                <View style={styles.flexEps}>
                    <Text style={styles.eps}>Episode</Text>
            
                    <FlatList 
                        data={this.props.episodeLocal.episode.reverse()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                            <Card style={styles.containerEps} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditEpisode')} >
                                    <Image source={{uri : item.image}} style={styles.imgList} />
                                </TouchableOpacity>
                                <View style={styles.txtImg}>
                                    <Text style={styles.titleEps}>{item.title}</Text>
                                    <Text style={styles.update}>{item.lastUpdate}</Text>
                                </View>
                            </Card>
                        }
                        />
                        
                </View>
                
                <View style={styles.buttonBottom}>
                    <TouchableOpacity style={styles.btnAdd} >
                        <Text style={styles.txtAdd}>+ Add Episode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDel} >
                        <Text style={styles.txtDel}>Delete Webtoon</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        episodeLocal: state.episode
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleGetEpisode: (idWebtoon) => dispatch(actionEpisode.handleGetEpisode(idWebtoon))
    }
  }
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        backgroundColor: '#fc4a1a'
    },
    containerEps:{
        paddingHorizontal:20,
        flexDirection:'row',
        backgroundColor:'#fc4a1a',
        borderRadius:10,
        width:'90%',
        alignSelf:'center' 
              
    },
    txtBar:{
        fontSize:20,
        color:'white'
    },
    row:{
        flexDirection:'row'
    },
    search:{
        borderColor:'black',
        borderWidth:2,
        padding:20,
        width:'70%',
        alignSelf:'center'
    },
    titleSearch:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:60   
    },
    flexEps:{
        flex:4
    },
    eps:{
        fontSize:20,
        fontWeight:'bold',
        marginVertical:10,
        marginLeft:60  
    },
    imgList:{
        width:100,
        height:100,
        borderColor:'white',
        borderWidth:2,
        marginVertical:10,
        borderRadius:10
    },
    txtImg:{
        marginLeft:10,
        marginVertical:10,
    },
    titleEps:{
        fontWeight:'bold',
        fontSize:18,
        marginBottom:20
    },
    update:{
        fontWeight:"bold",
        fontSize:12
    },
    txtAdd:{
        fontSize:22,
        fontWeight:'bold',
        textAlign:'center',
        paddingTop:7,
        color:'white'
        
    },
    txtDel:{
        fontSize:20,
        color:'white',
        textAlign:'center',
        paddingTop:7
    },
    btnAdd:{
        width:'40%',
        height:'40%',
        alignSelf:'center',
        backgroundColor:'#fc4a1a',
        borderRadius:4
    },
    btnDel:{
        width:'40%',
        height:'40%',
        alignSelf:'center',
        backgroundColor:'#fd1d1d',
        borderRadius:4,
        marginTop:4
    },
    input:{
        borderColor:'black',
        borderWidth:2,
        fontSize:18,
        fontWeight:'bold'
    },
    viewInput:{
        width:'70%',
        alignSelf:'center',
        flex:0.7
    },
    titleInput:{
        fontSize:20,
        fontWeight:'bold'
    },
    buttonBottom:{
        paddingTop:10,
        flex:1
    },
    iconCheck:{
        fontSize:36,
        fontWeight:'bold',
        color:'white'
    },
    iconBack:{
        color:'white'
    }
})
// export default CreateMyToon;
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateMyToon);