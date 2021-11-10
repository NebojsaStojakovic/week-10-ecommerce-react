import React from 'react'
import { BiPlus, BiMinus, BiX} from "react-icons/bi";

const CartItem = ({id, title, image, description, price, quantity, changeQuantity}) => (
    
    <div className="cart__row">
        <div className="cart__title">
            <img src={image} alt={title} />
            <h1>{id, title}</h1>
        </div>

        <div className="price">
            <h4>{price}</h4>
        </div>

        <div className="quantity">
            <button onClick={()=>changeQuantity(id, false)}> <BiMinus /> </button>
            <h4>{quantity}</h4>
            <button onClick={()=>changeQuantity(id, true)}>
                <BiPlus />
            </button>
        </div>

        <div className="price-total">
            <h4>
            {price * quantity}
            </h4>
        </div>

        <div className="clear-item">
            <button>
                <BiX />
            </button>
        </div>
        
    </div>
)

export default function Cart({items, changeQuantity, clearCart}) {
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
            {items.map(item => <CartItem key={item.id} {...item} changeQuantity={changeQuantity} />)}
            <button className="clear-cart-btn" onClick={clearCart}>Clear cart</button>
            </div>
            </div>
            <div className="cart__total">
                <div className="cart__subtotal">
                <h3>Order summary</h3>
                <div className="cart__shipping">
                    <div className="cart__shipping-left">
                        <h5>Subtotal</h5>
                        <span>500</span>
                    </div>
                    <div className="cart__shipping-left">
                        <h5>Shipping</h5>
                        <span>Free</span>
                    </div>
                </div>
                <div className="total__container">
                <h2>Total: </h2>
                <span>100$</span>
                </div>
                </div>
                <div className="cart__total-btns">
                    <button className="cart__total-checkout">
                        Checkout
                    </button>
                    <button className="cart__total-continue">
                        Continue shopping
                    </button>
                </div>
            </div>
        </div>
    )
}
