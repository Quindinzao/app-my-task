import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

export default function TaskList({ data, handleDelete }) {
    return (
        <Animatable.View
        style={styles.container}
        animation="bounceInRight"
        useNativeDriver
        duration={2000}
        >
            <TouchableOpacity onPress={ ( ) => handleDelete(data) }>
                <Ionicons name="md-checkmark-circle" size={30} color="#32cd32" />
            </TouchableOpacity>
            <View>
                <Text style={styles.task}>{data.task}</Text>
            </View>
        </Animatable.View>
    )
}