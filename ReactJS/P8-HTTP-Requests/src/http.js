// export default function Error({ title, message, onConfirm }) {
//   return (
//     <div className="error">
//       <h2>{title}</h2>
//       <p>{message}</p>
//       {onConfirm && (
//         <div id="confirmation-actions">
//           <button onClick={onConfirm} className="button">
//             Okay
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return resData.places;
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update user data.');
  }

  return resData.message;
}