import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { Header, Left, Icon, Body, Right, Card } from 'native-base';
import { connect } from 'react-redux';
import * as actionEpisode from '../redux/actions/actionEpisode'


class CreateMyToon extends Component {
    constructor(props){
    super(props);
    this.state ={
        imgEps: [
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
        image: []
    }
}
componentDidMount() {
    setTimeout(async () => {
      const idWebtoon = await AsyncStorage.getItem('id')
      console.log(idWebtoon)
      await this.props.handleGetEpisode(idWebtoon)
    }, 1000)
  }

    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Icon name='arrow-back' style={styles.iconBack} onPress={()=>this.props.navigation.navigate(this.props.navigation.getParam('prevScreen'))} />
                    </Left>
                    <Body>
                        <Text style={styles.txtBar}>Create Webtoon</Text>
                    </Body>
                    <Right>
                        <Icon name='checkmark' style={styles.iconCheck} onPress={() => this.props.navigation.navigate('MyToon')} />
                    </Right>
                </Header>

                <View style={styles.viewInput}>
                    <Text style={styles.titleInput}>Title</Text>
                    <TextInput  placeholder='Search' style={styles.input} />
                </View>

                <View style={styles.flexEps}>

                    <Text style={styles.eps}>Episode</Text>
                    
                        <FlatList 
                        data={this.props.episodeLocal.episode} 
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                        <Card style={styles.containerEps} >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditEpisode', {prevScreen: 'CreateMyToon'})} >
                                <Image source={{uri : item.image}} style={styles.imgList} />
                            </TouchableOpacity>
                            <View style={styles.txtImg}>
                                <Text style={styles.titleEps}>{item.title}</Text>
                                <Text style={styles.update}>{item.lastUpdate}</Text>
                            </View>
                            {console.log(this.props.episodeLocal.episode)}
                        </Card>
                        }
                        />
                </View>

                <View style={styles.viewBtn}>
                    <TouchableOpacity style={styles.btnAdd} onPress={() => this.props.navigation.navigate('CreateEpisode')} >
                        <Text style={styles.txtAdd}>+ Add Episode</Text>
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
    flexEps:{
        flex:4,
        width:'90%',
        alignSelf:'center'
    },
    viewBtn:{
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
    iconBack:{
        color:'white'
    },
    iconCheck:{
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
    eps:{
        fontSize:20,
        fontWeight:'bold',
        marginVertical:20,
        marginLeft:40  
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
        marginVertical:10
    },
    titleEps:{
        fontWeight:'bold',
        fontSize:18,
        marginBottom:20,
        color:'white'
    },
    update:{
        fontWeight:"bold",
        fontSize:12
    },
    txtAdd:{
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',  
        color:'white'
    },
    btnAdd:{
        padding:20,
        width:'40%',
        alignSelf:'center',
        backgroundColor:'#fc4a1a',
        marginTop:20,
        borderRadius:10
    },
    input:{
        borderColor:'black',
        borderWidth:2,
        fontSize:18
    },
    viewInput:{
        width:'70%',
        alignSelf:'center',
        marginBottom:10
    },
    titleInput:{
        fontSize:20,
        fontWeight:'bold'
    },
})
// export default CreateMyToon;
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateMyToon);