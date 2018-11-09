import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api'
import Tweet from '../components/Tweet'
import socket from 'socket.io-client';


class Timeline extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Início',
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('NewTweet')}>
                <MaterialIcons 
                    style={{ marginRight: 20 }}
                    name='add-circle-outline'
                    size={24}
                    color='#4BB0EE'
                />
            </TouchableOpacity>
        )
    })

    async componentDidMount() {

        this.subscribeToEvents()
        const response = await api.get('tweets')
        this.setState({ tweets: response.data })
    }

    subscribeToEvents = () => {
        const io = socket('http://10.0.3.2:3001')
        io.on('tweet', data => {
            this.setState({ 
                tweets: [data, ...this.state.tweets]
            })
        })
        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(tweet => (
                    tweet._id === data._id ? data : tweet
                ))
            })
        })
    }


    state = {
        tweets: []
    }

    render() {
        const { tweets } = this.state
        return (
            <View style={styles.container}>
                <FlatList
                    data={tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={({ item }) => <Tweet tweet={item} />}
                />
            </View>
        )
    }
}

export default Timeline

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
});
  