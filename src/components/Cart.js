import React from 'react'

const CartItem = ({id, title, image, description, price, quantity, changeQuantity}) => (
    <div>
        <h1>{id, title}</h1>
        <h4>{quantity}</h4>
        <div>{price * quantity}</div>
        <button onClick={()=>changeQuantity(id, false)}>--</button>
        <button onClick={()=>changeQuantity(id, true)}>++</button>
        {/* <img src={image} alt="todo" /> */}
    </div>
)

export default function Cart({items, changeQuantity, clearCart}) {
    return (
        <div>
            {items.map(item => <CartItem key={item.id} {...item} changeQuantity={changeQuantity} />)}
            <button onClick={clearCart}>Clear cart</button>
        </div>
    )
}
