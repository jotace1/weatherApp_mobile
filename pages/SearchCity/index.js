import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { actions as cityActions } from '../../store/ducks/cities';
import CityItem from '../../components/CityItem';
import axios from 'axios';


const SearchCity = () => {
    const allCities = useSelector(state => state.city.cities);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [ inputValue, setInputValue ] = useState('');


    const handleSubmit = async () => {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${inputValue}`);

        const { lat, lng } = response.data.results[0].geometry;
        const { country, state_code, city, town } = response.data.results[0].components;

        const cityInfo = {
            name: town ? town : city,
            uf: state_code,
            country,
            lat,
            long: lng
        }

        const coordinates = {
            lat,
            long: lng
        }

        dispatch(cityActions.addCity(cityInfo));

        navigation.navigate('Dashboard', coordinates);        
        
    }

    const handleUseLocalization = () => {
        navigation.navigate('Dashboard', 'geolocalization')
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.inputLabel}>Type your location here:</Text>
                <View style={styles.inputBox}>
                    <TextInput 
                    style={styles.inputStyle} 
                    placeholder="Please input the location"
                    value={inputValue} 
                    onChangeText={(text) => {
                        setInputValue(text);
                    }}
                    />
                </View>

                <View style={styles.buttonsBox}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonText} onPress={handleSubmit}>Submit</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity onPress={handleUseLocalization} style={styles.buttonStyle}>
                        <MaterialCommunityIcons name="crosshairs-gps" size={25} color="#fff"/>
                    </TouchableOpacity> 
                </View>

                <View style={styles.searchesContainer}>
                    <Text style={styles.searchTitle}>Previous Searches</Text>

                    {allCities.length ? allCities.map(city => <CityItem key={city.lat} city={city}/>): <Text style={styles.warning}>You don't have a searched city yet!</Text>}
                </View>



            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    main: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#fff',
    },
    inputLabel: {
        marginTop: 20,
        fontSize: 20
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#dbdbdb',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        height: 56,
        borderRadius: 12,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 5,
        fontSize: 15,
    },
    buttonsBox: {
        marginTop: 15,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff304f',
        borderRadius: 12,
        height: 56,
        width: 130,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    },
    searchesContainer: {
        marginTop: 20,
        flex: 1,
    },
    searchTitle: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
    },
    warning: {
        fontSize: 17,
        fontStyle: 'italic',
    }

})


export default SearchCity;