import { CartContext } from "../store/shopping-cart-context";
import { useContext } from 'react'

export default function Cart() {

  /**
   * P4 - LEARNING NOTE - 1 - You can destructure context items
   * from:
   *    const cartCtx = useContext(CartContext);
   *    {cartCtx.items.length === 0 && <p>No items in cart!</p>}
   * to:
   *    const { items } = useContext(CartContext);
   *    {items.length === 0 && <p>No items in cart!</p>}
   */


  /**
   * P4 - LEARNING NOTE - 2 - use Context Hook vs Consumer
   * Instead of using the useContext hook
   * you can wrap the component in Consumer, pass the jsx into a function 
   * and access all the context state using this method
   * Though this approach is a bit more cumbersome and more difficult to read
   * so is often no the default approach
   */

  const { items, updateItemQuantity } = useContext(CartContext);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;
            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  )
}




//   return (
//     <CartContext.Consumer> 
//       {(cartCtx) =>  {
//           const totalPrice = cartCtx.items.reduce(
//             (acc, item) => acc + item.price * item.quantity,
//             0
//           );
//           const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

//           return (

//         <div id="cart">
//       {cartCtx.items.length === 0 && <p>No items in cart!</p>}
//       {cartCtx.items.length > 0 && (
//         <ul id="cart-items">
//           {cartCtx.items.map((item) => {
//             const formattedPrice = `$${item.price.toFixed(2)}`;

//             return (
//               <li key={item.id}>
//                 <div>
//                   <span>{item.name}</span>
//                   <span> ({formattedPrice})</span>
//                 </div>
//                 <div className="cart-item-actions">
//                   <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
//                     +
//                   </button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//       <p id="cart-total-price">
//         Cart Total: <strong>{formattedTotalPrice}</strong>
//       </p>
//     </div>
//           )
//       }}
//     </CartContext.Consumer>
//   );
// }
