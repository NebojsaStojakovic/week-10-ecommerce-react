import React, { useState } from 'react';

const Item = ({id, title, image, description, price, addToCart}) => {
  const [showOptions, setshowOptions] = useState(false)
  return (
  <article key={id} className='menu__item' onMouseEnter={()=>setshowOptions(true)} onMouseLeave={()=>setshowOptions(false)}>
    <img src={image} alt={title} className='menu__photo' />
    <div className='menu__info'>
      <header>
        <h4 className='menu__title'>{title}</h4>
        <h4 className='menu__price'>{price}$</h4>
      </header>
      <button onClick={()=> addToCart({id, title, image, description, price})}>Add to cart</button>
      {showOptions && <div>

      </div>}
    </div>
  </article>
)
}

const Menu = ({ items, addToCart }) => {
  return (
    <div className='section__center'>
      {items.map((menuItem) => <Item {...menuItem} key={menuItem.id} addToCart={addToCart} /> )}
    </div>
  );
};

export default Menu;
