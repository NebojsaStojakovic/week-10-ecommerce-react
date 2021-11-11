import React, { useState } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { BiX } from "react-icons/bi";

export default function Modal({ setModalItem, id, title, image, description, price, addToCart }) {
  const [quantity, setQuantity] = useState(1)

  const closeModal = () => {
    setModalItem(null)
    setQuantity(1)
  }

  const handleKeyDown = e => {
    const isNumeric = !isFinite(e.key)
    const isDeleting = (e.key === "Backspace" || e.key === "Delete")
    const isArrow = (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowLeft")
    if (isNumeric && !isDeleting && !isArrow) e.preventDefault()
  }

  const handleClick = e => {
    const quantityInt = parseInt(quantity, 10)
    const isNum = !isNaN(quantityInt)
    const isNotZero = quantityInt > 0
    if(isNum && isNotZero) addToCart({ id, title, image, description, price, quantity: quantityInt })
    if(!isNotZero) closeModal()
  }

  return (
    <div className="modal-wrapper" onClick={closeModal}>
      <div className="modal">
        <div className="modal__content" onClick={e => e.stopPropagation()}>
          <div className="modal__image-container">
            <img src={image} alt={title} className="modal__image" />
          </div>
          <div className="modal__info">
            <h2 className="modal__title">{title}</h2>
            <div className="modal__price">${price}</div>
            <div className="modal__description">{description}</div>
            <div className="modal__input">
              <input className="btn modal__quantity" value={quantity} type="number" min="0" size="1" onKeyDown={handleKeyDown} onChange={e => setQuantity(e.target.value)} />
              <button className="btn modal__btn" onClick={handleClick}>Add to Cart <RiShoppingCartLine /></button>
            </div>
          </div>
          <div className="modal__close" onClick={closeModal}>
            <BiX className="modal__close-icon" />
          </div>
        </div>
      </div>
    </div>
  )
}
