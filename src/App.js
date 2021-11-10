import React, { useState, useEffect, useCallback } from 'react';
import Menu from './components/Menu';
import Categories from './components/Categories';
import items from './data';
import Modal from './components/Modal'
import Input from './components/Input';
import { RiShoppingCartLine, RiUserLine, RiArrowUpSFill } from "react-icons/ri";
import Cart from "./components/Cart";
import { Routes, Route, Link } from "react-router-dom";

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);
  const [cartItems, setCartItems] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const oldCartItems = JSON.parse(localStorage.getItem("cart"))
    setCartItems(oldCartItems)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const searchFilter = useCallback((value) => {
    setSearchValue(value)
    if (value === '') {
      setMenuItems(items);
      return ;
    }
    const newItems = items.filter((item) => item.title.trim().toLowerCase().includes(value));
    setMenuItems(newItems);
  }, [])

  const MainPage = () => (
    <>
      <div className="main__filters">
        <Categories categories={categories} filterItems={filterItems} />
        {/* <div className="input__box"> */}
        <Input searchFilter={searchFilter} searchValue={searchValue} />
        {/* </div> */}
      </div>
      <Menu items={menuItems} setItems={setCartItems} setModalItem={setModalItem} />
    </>
  )

  const numCartItems = cartItems.reduce(((a, b) => a + b.quantity), 0)

  return (
    <main>
      {modalItem && <Modal {...modalItem} setModalItem={setModalItem} />}
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
                {numCartItems}
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
            <Route path="/" element={<MainPage key={1312} />} />
            <Route path="/cart" element={<Cart items={cartItems} setItems={setCartItems} />} />
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
