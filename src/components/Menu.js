import React from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'

const Item = ({ id, title, image, category, description, price, addToCart, setModalItem }) => {
  const handleClick = e => {
    e.stopPropagation()
    addToCart({ id, title, image, description, price })
  }

  const formattedTitle = title.length > 40 ? title.substring(0, 37) + "..." : title

  return (
  <article onClick={()=> setModalItem({id, category, title, image, description, price, addToCart})} className='menu__item'>
    <div className="menu__img-cont">
    <img src={image} alt={title} className='menu__photo' />
    </div>
    <div className='menu__info'>
      <header>
        <h4 className='menu__title'>{formattedTitle}</h4>
      </header>
      <div className="menu__footer">
        <h4 className='menu__price'>{price}$</h4>
        <button className="menu__add-btn" onClick={handleClick}>
          <RiShoppingCartLine />
        </button>
      </div>
    </div>
  </article>
)}

export default function Menu({ menuItems, setCartItems, setModalItem }) {

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const itemsShallowCopy = [...prevItems]
      const foundItem = itemsShallowCopy.find(currItem => currItem.id === item.id)
      if (foundItem === undefined) {
        const newQuantity = item.quantity || 1
        return [...itemsShallowCopy, { ...item, quantity: newQuantity }]
      } else {
        const newQuantity = foundItem.quantity + (item.quantity || 1)
        const fiCopy = { ...foundItem, quantity: newQuantity }
        itemsShallowCopy.splice(itemsShallowCopy.indexOf(foundItem), 1, fiCopy)
        return itemsShallowCopy
      }
    })
  }

  return (
    <div className='section__center'>
      {menuItems.map((menuItem) => <Item {...menuItem} key={menuItem.id} addToCart={addToCart} setModalItem={setModalItem} />)}
    </div>
  )
}
