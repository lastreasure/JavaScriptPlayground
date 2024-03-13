import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// Defined outside of App as we only need this to run once on first render
const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
const storedPlaces = storeIds.map(id => AVAILABLE_PLACES.find((place) => place.id === id))

function App() {

  // const modal = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
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

  /* P5 - LEARNING NOTE - 3 - Example of redundant useEffect
   * This is an example of a redundance use of useEffect
   * all the code in this instance would complete before the app is finished rendering
   * and there is no callback functions to execute hence this code is fine to be ran outside of a useEffect
   * as this code runs syncronously and immediately
   */
  // useEffect(() => {
  //   const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
  //   const storedPlaces = storeIds.map(id => AVAILABLE_PLACES.find((place) => place.id === id))
  //   setPickedPlaces(storedPlaces)
  // }, []
  // )

  function handleStartRemovePlace(id) {
    setModalIsOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false)
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


   /* P5 - LEARNING NOTE - 6 - Example of useCallback
    * The useCallback hook is a built-in hook in React that lets you memoize a callback function by 
    * preventing it from being recreated on every render. 
    * In simple terms, it means that the callback function is cached and does not get redefined on every render
    * 
    * Ensuring a function is not recreated whenever the surrounding function is executed again
    * this way if you use the function in a useEffect dependency you'll avoid infinite loops
    * as react will not have to compare two different instances of the same function -
    * as the function is recreated when the component rerenders - but 
    * know it is the same cached object
    * 
    * The dependency array here works in the same way as useEffect
    */
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false)

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)))
  }, [])

  return (
    <>
      {/* <Modal ref={modal} open={modalIsOpen}> */}
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
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
