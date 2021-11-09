import React from 'react';

const Menu = ({ items }) => {
  return (
    <div className='section__center'>
      {items.map((menuItem) => {
        const { id, title, image, price } = menuItem;
        return (
          <article key={id} className='menu__item'>
            <img src={image} alt={title} className='menu__photo' />
            <div className='menu__info'>
              <header>
                <h4 className='menu__title'>{title}</h4>
                <h4 className='menu__price'>{price}$</h4>
              </header>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;
