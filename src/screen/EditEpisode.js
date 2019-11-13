import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Header, Left, Icon, Body, Right, Card } from 'native-base';
import { connect } from 'react-redux';
import * as actionPage from '../redux/actions/actionPage';


class CreateMyToon extends Component {
    constructor(props){
    super(props);
    this.state ={
        editEps: [
            {
              id: 0,
              title: '1.Cover.png',
              url: 'https://upload.wikimedia.org/wikipedia/id/thumb/3/3e/Kanojo%2C_Okarishimasu_Vol_1.jpg/220px-Kanojo%2C_Okarishimasu_Vol_1.jpg',
            },
            {
              id:1,
              title: '2.Introduction.png',
              url: 'https://www.maid.my.id/wp-content/uploads/2018/07/22151.jpg',
            },{
                id:1,
                title: '2.Lorem Ipsum.png',
                url: 'https://www.maid.my.id/wp-content/uploads/2018/07/22151.jpg',
              },{
                id:1,
                title: '2.Lorem Ipsum.png',
                url: 'https://www.maid.my.id/wp-content/uploads/2018/07/22151.jpg',
              },
          ]
    }
}
componentDidMount() {
    this.props.handleGetPage({
      id_webtoon: 2,
      id_episode: 1
    })
  }

    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Icon name='arrow-back' style={styles.iconBack} onPress={() => this.props.navigation.navigate(this.props.navigation.getParam('prevScreen'))} />
                    </Left>
                    <Body>
                        <Text style={styles.txtBar}>Edit Episode</Text>
                    </Body>
                    <Right>
                        <Icon name='checkmark' style={styles.iconCheck} onPress={() => this.props.navigation.navigate('CreateMyToon')} />
                    </Right>
                </Header>

                <View style={styles.viewInput}>
                    <Text style={styles.titleInput}>Name</Text>
                    <TextInput  placeholder='Search' style={styles.input} value='Episode 1' />
                </View>

                <View style={styles.flexEps}>   
                    <Text style={styles.eps}>Add Images</Text>                     
                        <FlatList 
                        // data={this.state.editEps}
                        data={this.props.pageLocal.page}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                        <Card style={styles.containerEps} >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditEpisode')} >
                                <Image source={{uri : item.image}} style={styles.imgList} />
                            </TouchableOpacity>
                            <View style={styles.txtImg}>
                                <Text style={styles.titleEps}>{item.page}</Text>
                                <Text style={styles.update}>{item.lastUpdate}</Text>
                            </View>
                        </Card>
                        }
                        />  
                </View>

                <View style={styles.buttonBottom}>
                    <TouchableOpacity style={styles.btnAdd} >
                        <Text style={styles.txtAdd}>+ Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDel} >
                        <Text style={styles.txtDel}>Delete Episode</Text>
                    </TouchableOpacity>
                </View>
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
        handleGetPage: (params) => dispatch(actionPage.handleGetPage(params)),
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
        width:'80%',
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
    },
    flexEps:{
        flex:4
    }
})
// export default CreateMyToon;
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateMyToon);