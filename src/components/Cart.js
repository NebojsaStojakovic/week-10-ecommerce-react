import React, { useState } from 'react'
import { BiPlus, BiMinus, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";

const CartItem = ({ id, title, image, description, price, quantity, changeQuantity, removeFromCart }) => (

  <div className="cart__row">
    <div className="cart__title">
      <img src={image} alt={title} />
      <h1>{title}</h1>
    </div>

    <div className="price">
      <h4>{price}</h4>
    </div>

    <div className="quantity">
        <button onClick={() => changeQuantity(id, true)}>
        <BiPlus />
      </button>
      <h4>{quantity}</h4>
      <button onClick={() => changeQuantity(id, false)}> <BiMinus /> </button>
    </div>

    <div className="price-total">
      <h4>
        {(price * quantity).toFixed(2)}
      </h4>
    </div>

    <div className="clear-item">
      <button onClick={() => removeFromCart(id)}>
        <BiX />
      </button>
    </div>

  </div>
)

export default function Cart({ items, setItems }) {

  const [total, setTotal] = useState(items.reduce(((a, b) => a + b.price * b.quantity), 0).toFixed(2))

  const changeQuantity = (id, increment) => {
    setItems(prevItems => {
      const itemsShallowCopy = [...prevItems]
      const foundItemCopy = { ...prevItems.find(currItem => currItem.id === id) }
      const foundIndex = prevItems.findIndex(currItem => currItem.id === id)
      increment ? foundItemCopy.quantity++ : foundItemCopy.quantity--
      if (foundItemCopy.quantity === 0) {
        itemsShallowCopy.splice(foundIndex, 1)
      } else {
        itemsShallowCopy.splice(foundIndex, 1, foundItemCopy)
      }
      setTotal(itemsShallowCopy.reduce(((a, b) => a + b.price * b.quantity), 0).toFixed(2))
      return itemsShallowCopy
    })
  }

  const removeFromCart = id => {
    const newItems = [...items]
    newItems.splice(newItems.findIndex(item => item.id === id), 1)
    setItems(newItems)
  }

  const clearCart = () => setItems([])

  console.log(total)

  return (
    <div className="cart__content">
      <div className="cart__left">
        <div className="cart__titles">
          <h3>Product</h3>
          <h3>Price</h3>
          <h3>Qnt</h3>
          <h3>Total</h3>
        </div>
        <div>
          {items.map(item => <CartItem key={item.id} {...item} changeQuantity={changeQuantity} removeFromCart={removeFromCart} />)}
          <button className="clear-cart-btn" onClick={clearCart}>Clear cart</button>
        </div>
      </div>
      <div className="cart__total">
        <div className="cart__subtotal">
          <h3>Order summary</h3>
          <div className="cart__shipping">
            <div className="cart__shipping-left">
              <h5>Subtotal</h5>
              <span>{total}</span>
            </div>
            <div className="cart__shipping-left">
              <h5>Shipping</h5>
              <span>Free</span>
            </div>
          </div>
          <div className="total__container">
            <h2>Total: </h2>
            <span>{total}$</span>
          </div>
        </div>
        <div className="cart__total-btns">
          <button className="btn cart__total-checkout">
            Checkout
          </button>
          <Link to="/">
            <button className="btn cart__total-continue">
                Continue shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
