import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Image, FlatList, ScrollView, Share, TouchableOpacity} from 'react-native';
import { Left, Right, Icon, Button, Header, Title, Body, Card, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import * as actionEpisode from '../redux/actions/actionEpisode';


export class Detail extends Component  {

    constructor(props) {
      super(props);
      this.state = {
        detailImg: [
          {
            id: 0,
            title: 'Episode 1',
            url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
            lastUpdate: '1 Oktober 2019'
          },
          {
            id:1,
            title: 'Episode 2',
            url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
            lastUpdate: '2 Oktober 2019'
          },
          {
            id:2,
            title: 'Episode 3',
            url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
            lastUpdate: '3 Oktober 2019'
          },
        ],
        data:[]
      };
    }

  onClickShare = () => Share.share({
    title: 'Title',
    message: 'Want Share?',
    subject : 'Subject',
  })

  componentDidMount() {
    setTimeout(async () => {
      const idWebtoon = this.props.navigation.getParam('id')
      await this.props.handleGetEpisode(idWebtoon)
    }, 1000)
  }

  onHandleDetailEp(item) {
    this.props.navigation.navigate('DetailEp', {
      prevScreen: 'Detail',
      title: item.title,
      id: item.id,
      webtoonId: item.webtoonId.id,
      webtoonName: item.webtoonId.name
  })
  }

  render () {
  return(
  
    <View>
      <Header style={styles.bar}>
        <Left>
          <Button transparent onPress={()=>this.props.navigation.navigate(this.props.navigation.getParam('prevScreen'))}>
            <Icon name='arrow-back' />
          </Button>
        </Left>      
        <Body>
          <Title><Text>{this.props.navigation.getParam('title')}</Text></Title>
        </Body>
        <Right >
          <Button onPress={this.onClickShare} style={styles.share}>
            <Icon name='share' />
          </Button>
        </Right>
      </Header>

    <View style={styles.viewImageHeader}>

          <TouchableOpacity>
            <Image style={styles.imageHeader} source={{uri: this.props.navigation.getParam('image')}}  />
          </TouchableOpacity>
    </View>
    <ScrollView style={{height:"55%"}}>
        <FlatList         
          scrollEnabled={true}
          data={this.props.episodeLocal.episode}     
          // data={this.state.detailImg}
          renderItem={({item, index})=>
          <Card style={styles.listRow}>
            <View style={styles.listImg}>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('DetailEp', {
                                                id_webtoon: this.props.navigation.getParam('id'),
                                                id_episode: item.id,
                                                title: item.title
                                                
                                            })}
                >{console.log(this.props.episodeLocal.episode)}
                  <Image style={styles.imageList} source={{uri: item.image}}  />
                </TouchableOpacity>
            </View>
            <View style={styles.marginList}>
                <Text style={styles.titleImg}>{item.title}</Text>
                <Text style={styles.dataImg}>{item.lastUpdate}</Text>
            </View>
          </Card>
        }
        />
        
      </ScrollView>
    </View>

  )}

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
  bar:{
    backgroundColor:'#fc4a1a'
  },
  share:{
    backgroundColor:'#fc4a1a'
  },
  imageHeader : {
    width : '100%',
    height : 200,
  },
  listRow:{
    flexDirection:'row',
    backgroundColor:'#fc4a1a',
    borderRadius:10,
  },
  viewImageHeader : {
      borderWidth : 2,
      marginBottom : 20
    },
    imageList : {
      marginLeft : 20,
      width : 100,
      height : 100,
      borderColor:'white',
      borderWidth:2,
      borderRadius:10,
      marginVertical:10
    },
    marginList:{
      marginLeft:20,
      marginVertical:30
    },
    titleImg:{
      fontSize:18,
      fontWeight:'bold',
      color:'white'
    },
    dataImg:{
      fontSize:14,
      fontWeight:'bold',
    }
    
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);