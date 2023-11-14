import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import styles from './GoogleMap.module.scss'

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 31.9636,
  lng: 35.9306,
};

const redMarkerIcon = {
  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // URL to the red marker icon
};
const GoogleMapComponent = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = async (place) => {
    const details = await getPlaceDetails(place.place_id);
    setSelectedPlace({
      address: details.formatted_address,
      latlng: {
        lat: details.geometry.location.lat(),
        lng: details.geometry.location.lng(),
      },
    });
  };

  const getPlaceDetails = async (placeId) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=YOUR_GOOGLE_MAPS_API_KEY`
    );
    return response.data.result;
  };

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);
  return (
    <div className={styles.mapWrapper}>
      <h2 className={styles.title}> You Are Located Here! </h2>
      <p>Tip:
        to update your location type it down!!</p><LoadScript googleMapsApiKey="AIzaSyDQ_shkZFZVHyLMQrcjLms_wSvtagecEPY"
          libraries={['places']} >
        <GoogleMap mapContainerStyle={containerStyle} center={userLocation || center} zoom={15}>
          {userLocation && <Marker position={userLocation} icon={redMarkerIcon} />}
          <Autocomplete
            onLoad={(autocomplete) => {
              console.log('Autocomplete loaded:', autocomplete);
            }}
            onPlaceChanged={() => {
              const place = autocomplete.getPlace();
              handlePlaceSelect(place);
            }}
          >
            <input
              type="text"
              placeholder="Enter your address"
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
              }}
            />
          </Autocomplete>
        </GoogleMap>
        {selectedPlace && (
          <div>
            <h3>Selected Place</h3>
            <p>Address: {selectedPlace.address}</p>
            <p>Latitude: {selectedPlace.latlng.lat}</p>
            <p>Longitude: {selectedPlace.latlng.lng}</p>
          </div>
        )}
      </LoadScript>
    </div >
  );
};

export default GoogleMapComponent;
