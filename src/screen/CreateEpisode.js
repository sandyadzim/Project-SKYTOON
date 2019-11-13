import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Header, Left, Icon, Body, Right, Card, Button } from 'native-base';
import { connect } from 'react-redux';
import * as actionEpisode from '../redux/actions/actionEpisode';


class CreateMyToon extends Component {
    constructor(props){
    super(props);
    this.state ={
        addImg: [
            {
              id: 0,
              title: '1.Cover.png',
              url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
            },
            {
              id:1,
              title: '2.Introduction.png',
              url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
            },
            {
                id:2,
                title: '3.Lorem Ipsum.png',
                url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
            },
            {
                id:3,
                title: '4.Lorem Ipsum.png',
                url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
            },
            {
                id:4,
                title: '5.Lorem Ipsum.png',
                url: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
            },
          ]
    }
}
componentDidMount() {
    this.props.handleGetImage({
      user_id: 2,
      webtoon_id: 2,
      episode_id: 1
    })
  }
    render() {
        return (
            <View style={styles.container}>

                <Header style={styles.header}>
                    <Left>
                        <Icon name='arrow-back' style={styles.iconBack} onPress={() => this.props.navigation.navigate('CreateMyToon')} />
                    </Left>
                    <Body>
                        <Text style={styles.txtBar}>Create Episode</Text>
                    </Body>
                    <Right>
                        <Icon name='checkmark' style={styles.iconCheck} onPress={() => this.props.navigation.navigate('CreateMyToon')} />
                    </Right>
                </Header>

                <View style={styles.viewInput}>
                    <Text style={styles.titleInput}>Name</Text>
                    <TextInput style={styles.input} />
                </View>

                <View style={styles.flexEps}>
                    <Text style={styles.eps}>Add Images</Text>
                    
                        <FlatList 
                        // data={this.state.addImg}
                        data={this.props.imageLocal.episode} 
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                        <Card style={styles.containerEps} >
                            <Image source={{uri : item.image}} style={styles.imgList} />
                            <View style={styles.txtImg}>
                                <Text style={styles.titleEps}>{item.title}</Text>
                                <View>
                                    <Button style={styles.buttonDel}>
                                        <Text style={styles.del}>Delete</Text>
                                    </Button>
                                </View>
                            </View>                           
                        </Card>                        
                        }                        
                        />
                </View>

                <View style={styles.flexBtn} >
                    <View>
                        <TouchableOpacity style={styles.btnAdd} >
                            <Text style={styles.txtAdd}>+ Image</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput style={styles.test} /> 
                    </View>
                </View>

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
      imageLocal: state.episode
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleGetImage: (params) => dispatch(actionEpisode.handleGetImage(params))
    }
  }

const styles = StyleSheet.create({
    input:{
        borderColor:'black',
        borderWidth:2,
        fontSize:18
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
    container:{
        flex:1
    },
    flexEps:{
        flex:4
    },
    flexBtn:{
        flex:1
    },
    containerEps:{
        paddingHorizontal:20,
        flexDirection:'row',
        backgroundColor:'#fc4a1a',
        borderRadius:10,
        width:'90%',
        alignSelf:'center' 
    },
    iconBack:{
        color:'white'
    },
    iconCheck:{
        color:'white'
    },
    containerSearch:{
        borderColor:'black',
        borderWidth:2,
        marginHorizontal:20,
        marginVertical:5
    },
    header:{
        backgroundColor:'#fc4a1a'
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
        alignSelf:'center',
        fontSize:40
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
        flexDirection:'column'
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
    buttonDel:{
        backgroundColor:'#fd1d1d',
        width:70,
        borderRadius:5
    },
    del:{
        fontSize:16,
        paddingLeft:10,
        color:'white'
    }
})
// export default CreateMyToon;
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateMyToon);