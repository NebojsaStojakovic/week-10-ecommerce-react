import React, { useState } from 'react';

const Item = ({id, title, image, description, price, addToCart, setModalItem}) => {
  const [showOptions, setshowOptions] = useState(false)
  return (
  <article className='menu__item' onMouseOver={()=>setshowOptions(true)} onMouseLeave={()=>setshowOptions(false)}>
    <img src={image} alt={title} className='menu__photo' />
    <div className='menu__info'>
      <header>
        <h4 className='menu__title'>{title}</h4>
        <h4 className='menu__price'>{price}$</h4>
      </header>
      {showOptions && <div>
        <button onClick={()=> setModalItem({id, title, image, description, price, addToCart})}>See Item</button>
        <button onClick={()=> addToCart({id, title, image, description, price})}>Add to cart</button>
      </div>}
    </div>
  </article>
)}

const Menu = ({ items, setItems, setModalItem }) => {
  const addToCart = (item) => {
    setItems(prevItems => {
      const itemsShallowCopy = [...prevItems]
      const foundItem = itemsShallowCopy.find(currItem => currItem.id === item.id)
      if(foundItem === undefined) {
        return [...itemsShallowCopy, {...item, quantity: 1}]
      } else {
        const fiCopy = {...foundItem, quantity: foundItem.quantity + 1}
        itemsShallowCopy.splice(itemsShallowCopy.indexOf(foundItem), 1, fiCopy)
        return itemsShallowCopy
      }
    })
  }

  return (
    <div className='section__center'>
      {items.map((menuItem) => <Item {...menuItem} key={menuItem.id} addToCart={addToCart} setModalItem={setModalItem} /> )}
    </div>
  );
};

export default Menu;
