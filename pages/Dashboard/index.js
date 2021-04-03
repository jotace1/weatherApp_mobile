import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import WeatherInfo from '../../components/WeatherInfo';
import UnitsPicker from '../../components/UnitsPicker';
import ReloadIcon from '../../components/ReloadIcon';
import WeatherDetails from '../../components/WeatherDetails';
import { colors } from '../../utils';
import { WEATHER_API_KEY } from "@env"

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function Dashboard({ route }) {
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ currentWeather, setCurrentWeather ] = useState([])
  const [ unitSystem, setUnitSystem ] = useState('metric')


  useEffect(() => {
    if (route.params === 'geolocalization') {
      load()
    } else {
      loadByParams()
    }
    
  }, [unitSystem]);


  async function loadByParams() {
    const {lat, long} = route.params;

    const weatherUrl = `${BASE_WEATHER_URL}lat=${lat}&lon=${long}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;

    const response = await axios.get(weatherUrl);

    if (response.data) {
      setCurrentWeather(response.data);
    } else {
      setErrorMessage(response.statusText);
    }
  }

  async function load() {
    try {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app!');
        return;
      }

      const location = await Location.getLastKnownPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;


      const response = await axios.get(weatherUrl);

      if (response.data) {
        setCurrentWeather(response.data);
      } else {
        setErrorMessage(response.statusText);
      }

    } catch (err) {
        setErrorMessage(err.message);
    }
  }

  if (currentWeather.main) {
    return (
      <View style={styles.container}>
          <StatusBar style="auto" />

          <View style={styles.main}>
            <UnitsPicker unitsSystem={unitSystem} setUnitSystem={setUnitSystem}/>
            <ReloadIcon load={load} />
            <WeatherInfo currentWeather={currentWeather} />
          </View>
          <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem}/>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});
