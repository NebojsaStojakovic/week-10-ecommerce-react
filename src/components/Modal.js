import React from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { BiX } from "react-icons/bi";

export default function Modal({ setModalItem, id, title, image, description, price, addToCart }) {
  return (
    <div className="modal-wrapper" onClick={() => setModalItem(null)}>
      <div className="modal">
        <div className="modal__content" onClick={e => e.stopPropagation()}>
          <div className="modal__image-container">
            <img src={image} alt={title} className="modal__image" />
          </div>
          <div className="modal__info">
            <h2 className="modal__title">{title}</h2>
            <div className="modal__price">${price}</div>
            <div className="modal__description">{description}</div>
            <div>
              <button className="btn modal__btn" onClick={() => addToCart({ id, title, image, description, price })}>Add to Cart <RiShoppingCartLine /></button>
            </div>
          </div>
          <div className="modal__close" onClick={() => setModalItem(null)}>
            <BiX className="modal__close-icon" />
          </div>
        </div>
      </div>
    </div>
  )
}
