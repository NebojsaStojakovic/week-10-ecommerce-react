import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';
import Input from './Input';
import { RiShoppingCartLine, RiUserLine } from "react-icons/ri";

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const searchFilter = (value) => {
    if (value === '') {
      setMenuItems(items);
      return ;
    }
    const newItems = items.filter((item) => item.title.trim().toLowerCase().includes(value));
    setMenuItems(newItems);
  }

  return (
    <main>
      <header className="header">
        <a href="#">.everything</a>
        <div className="header__icons">
          <button>
            <RiUserLine />
          </button> 
          <button>
            <RiShoppingCartLine />
            <span className="cart-item">
              {/* {cartItems.lenght} */}
            </span>
          </button>
        </div>
      </header>
      <section className="menu section">
        {/* <div className="title">
          <h2>our products</h2>
          <div className="underline"></div>
        </div> */}
        <div className="main_section">
          <div className="main__filters">
        <Categories categories={categories} filterItems={filterItems} />
        <Input searchFilter={searchFilter}/>
        </div>
        <Menu items={menuItems} />
        </div>
      </section>
    </main>
  );
}

export default App;
