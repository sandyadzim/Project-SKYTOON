import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, Share, ScrollView, TouchableOpacity} from 'react-native';
import { Left, Right, Icon, Header, Body} from 'native-base';
import { connect } from 'react-redux';
import * as actionPage from '../redux/actions/actionPage';
// import console = require('console');


class DetailEp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          episode: [
            {
              id: 0,
              image: 'https://cdn.komikcast.com/wp-content/img/S/Solo_leveling/076/03_01.jpg',
            },
            {
              id: 1,
              image: 'https://cdn.komikcast.com/wp-content/img/S/Solo_leveling/076/03_02.jpg',

            },
            {
              id: 2,
              image: 'https://cdn.komikcast.com/wp-content/img/S/Solo_leveling/076/04_01.jpg',
            },
            {
              id: 3,
              image: 'https://cdn.komikcast.com/wp-content/img/S/Solo_leveling/076/04_02.jpg',
            },
          ]
        };
      }

    onClickShare = () => Share.share({
        title: 'Title',
        message: 'Share',
        url: 'www.example.com',
        subject : 'Subject'
    })

    componentDidMount() {
      setTimeout(async () => {
        const idWebtoon = this.props.navigation.getParam('id_webtoon')
        const idEpisode = this.props.navigation.getParam('id_episode')
        await this.props.handleGetPage(idWebtoon, idEpisode)
        console.log(idWebtoon)
        console.log(idEpisode)
      }, 1000)
    }


    render() {
      const {page} = this.props.pageLocal
        return (
            <View>
                <Header style={styles.bar}>
                    <Left>
                        <TouchableOpacity style={styles.back} onPress={()=>this.props.navigation.navigate('Details')}>
                        <Icon name='arrow-back' style={styles.back} />
                        </TouchableOpacity>
                    </Left>
                    <Body><Text style={styles.barTitle}>{this.props.navigation.getParam('title')}</Text></Body>
                    <Right>
                        <Icon name='share' style={styles.share} onPress={this.onClickShare} />
                    </Right>
                </Header>
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <FlatList 
                            // data={this.state.episode}
                            data={page}  
                            showsVerticalScrollIndicator={false}
                            renderItem={({item})=>
                            <View>
                                <Image source={{uri : item.image}} style={styles.imgEps} />
                            </View>
                            }
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
      pageLocal: state.page
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleGetPage: (idWebtoon, idEpisode) => dispatch(actionPage.handleGetPage(idWebtoon, idEpisode))
    }
  }

const styles = StyleSheet.create({
    bar:{
        backgroundColor:'#fc4a1a'
    },
    back:{
        color:'white',
    },
    share:{
        color:'white'
    },
    barTitle:{
        fontSize:20,
        color:'white'
    },
    imgEps:{
        width: '100%',
        height: 500,
        borderColor:'black',
    }
})
// export default DetailEp;
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailEp);