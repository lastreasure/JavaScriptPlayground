import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  // loading, data and error state are 3 common pieces of state
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {

       const places = await fetchAvailablePlaces()
    
        // fetch user location using navigator
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places, 
            position.coords.latitude, 
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);

        })
        
      } catch (error) {
        // setError(error)
        setError({
          message: 
          error.message || 'Could not fetch places, please try again later'
        })
        setIsFetching(false);
      }
    }
    fetchPlaces();

// Pre pre refactored
    // const response = await fetch('http://localhost:3000/places')
    // const resData = await response.json();

    // if(!response.ok) {
    //   throw new Error('Failed to fetch places')
    // }
// Pre refactored
    // fetch('http://localhost:3000/places')
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((resData) => {
    //     setAvailablePlaces(resData.places);
    //   });

  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}