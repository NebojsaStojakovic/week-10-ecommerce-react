import React, { useCallback } from 'react';

const Item = ({id, title, image, description, price, addToCart, setModalItem}) => {
  const handleClick = e => {
    e.stopPropagation()
    addToCart({id, title, image, description, price})
  }

  const formattedTitle = title.length > 40 ? title.substring(0, 37) + "..." : title

  return (
  <article onClick={()=> setModalItem({id, title, image, description, price, addToCart})} className='menu__item'>
    <img src={image} alt={title} className='menu__photo' />
    <div className='menu__info'>
      <header>
        <h4 className='menu__title'>{formattedTitle}</h4>
        <h4 className='menu__price'>{price}$</h4>
      </header>
      <div>
        <button onClick={handleClick}>Add to cart</button>
      </div>
    </div>
  </article>
)}

const Menu = ({ items, setItems, setModalItem }) => {
  const addToCart = useCallback((item) => {
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
  }, [])

  return (
    <div className='section__center'>
      {items.map((menuItem) => <Item {...menuItem} key={menuItem.id} addToCart={addToCart} setModalItem={setModalItem} /> )}
    </div>
  );
};

export default Menu;
