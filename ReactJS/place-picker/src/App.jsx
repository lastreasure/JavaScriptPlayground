import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  /* P5 - LEARNING NOTE - 1 - What is a side effect?
  * A React side-effect occurs when we use something that is outside the scope of React.js in our React components e.g. Web APIs
  * This component is a side effect because it's not related to the 
  * main goal of the App component function -> the main goal of an App.js is to return renderable jsx code,
  * fetching the users location is not related to this, and this function is not called immeditely
  * (Navigator is an in built browser obj)
  */
  // navigator.geolocation.getCurrentPostiion((position) => {
  //   const sortedPlaces = 
  //   sortPlacesByDistance(AVAILABLE_PLACES, postiion.coords.latitude, position.coords.longitude)
  // })

  useEffect(() => {
    // Side Effect 1 example
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    /* P5 - LEARNING NOTE - 2 - Not all side effects need useEffect
    * Side effect 2 example - because this is not related to rendering the jsx code
    * this does not have to exist within the useEffect 
    * because it will not create an infinite loop as it is only ever executed from 
    * this function being triggered from a user interaction
    * you only need the useEffect to prevent infinite loops or
    * when you have code that can only run after the component executed at least once
    */
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    // checking to see if we already have the id stored 
    if(storedIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]))
    }
  }


  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          fallbackText="Sorting places by distances..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
