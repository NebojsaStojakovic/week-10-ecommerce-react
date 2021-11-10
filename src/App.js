import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Categories from './components/Categories';
import items from './data';
import Input from './components/Input';
import { RiShoppingCartLine, RiUserLine, RiArrowUpSFill } from "react-icons/ri";
import Cart from "./components/Cart";
import { Routes, Route, Link } from "react-router-dom";

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const oldCartItems = JSON.parse(localStorage.getItem("cart"))
    setCartItems(oldCartItems)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item) => {
    setCartItems(prevItems => {
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

  const changeQuantity = (id, increment) => {
    setCartItems(prevItems => {
      const itemsShallowCopy = [...prevItems]
      const foundItemCopy = {...itemsShallowCopy.find(currItem => currItem.id === id)}
      const foundIndex = itemsShallowCopy.indexOf(foundItemCopy)
      increment ? foundItemCopy.quantity++ : foundItemCopy.quantity--
      if(foundItemCopy.quantity === 0) {
        itemsShallowCopy.splice(foundIndex, 1)
      } else {
        itemsShallowCopy.splice(foundIndex, 1, foundItemCopy)
      }
      return itemsShallowCopy
    })
  }

  const clearCart = () => setCartItems([])

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

  const MainPage = () => (
    <>
      <div className="main__filters">
        <Categories categories={categories} filterItems={filterItems} />
        {/* <div className="input__box"> */}
        <Input searchFilter={searchFilter}/>
        {/* </div> */}
      </div>
      <Menu items={menuItems} addToCart={addToCart} />
    </>
  )

  return (
    <main>
      <header className="header">
        <Link to="/" className="header__logo">
          {/* <a href="#"> */}
          .everything
          {/* </a> */}
        </Link>
        <div className="header__icons">
          <button>
            <RiUserLine />
          </button> 
          <button>
            <Link to="/cart">
              <RiShoppingCartLine />
              <span className="cart-item">
                {cartItems.lenght}
              </span>
            </Link>
          </button>
        </div>
      </header>
      <section className="menu section">
        {/* <div className="title">
          <h2>our products</h2>
          <div className="underline"></div>
        </div> */}
        <div className="main_section">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<Cart items={cartItems} changeQuantity={changeQuantity} clearCart={clearCart} />} />
          </Routes>
        </div>
      </section>
      <div className="to-top">
        <a href="#">
          <RiArrowUpSFill />
        </a>
      </div>
    </main>
  );
}

export default App;
