import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CityItem = ({ city }) => {
    const navigation = useNavigation();

    const handleSearchCity = () => {
        const coordinates = {
            lat: city.lat,
            long: city.long,
        }

        navigation.navigate('Dashboard', coordinates)
    }

    return (
        <TouchableOpacity onPress={handleSearchCity}>
        <View style={styles.container} >
            <View style={styles.cityBox}>
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.cityDetails} >{city.uf}, {city.country}</Text>
            </View>

            <View>
            <MaterialCommunityIcons name="arrow-right" size={30} color="#ff304f"/>
            </View>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 80,
        backgroundColor: '#dbdbdb',
        marginBottom: 10,
        borderRadius: 12,
    },
    cityBox: {
        paddingLeft: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#ff304f',
    },
    cityName: {
        fontSize: 17,
        fontWeight: '700',
    },
    cityDetails: {
        fontSize: 15,
    }
})

export default CityItem;