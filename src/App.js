import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { RiUserLine, RiShoppingCartLine, RiArrowUpSFill } from "react-icons/ri";
import Modal from "./components/Modal";
import Cart from "./components/Cart"
import items from './data';
import MainPage from "./components/MainPage";

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function App() {
  const [modalItem, setModalItem] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [menuItems, setMenuItems] = useState(items)
  const [categories, setCategories] = useState(allCategories)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const oldCartItems = JSON.parse(localStorage.getItem("cart"))
    setCartItems(oldCartItems)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    modalItem && (document.body.style.overflow = 'hidden');
    !modalItem && (document.body.style.overflow = 'unset');
  }, [modalItem])

  const searchFilter = (value) => {
    setSearchValue(value)
    if (value === '') {
      setMenuItems(items);
      return;
    }
    const newItems = menuItems.filter((item) => item.title.trim().toLowerCase().includes(value));
    setMenuItems(newItems);
  }

  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const numCartItems = cartItems.reduce(((a, b) => a + b.quantity), 0)

  return (
    <div>
      {modalItem && <Modal {...modalItem} setModalItem={setModalItem} />}
      <header className="header">
        <Link to="/" className="header__logo">
          .everything
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
        <div className="main_section">
          <Routes>
            <Route path="/" element={<MainPage categories={categories} filterItems={filterItems} setCartItems={setCartItems} searchValue={searchValue} setModalItem={setModalItem} searchFilter={searchFilter} menuItems={menuItems} setMenuItems={setMenuItems} />} />
            <Route path="/cart" element={<Cart items={cartItems} setItems={setCartItems} />} />
          </Routes>
        </div>
      </section>
      <div className="to-top">
        <a href="#">
          <RiArrowUpSFill />
        </a>
      </div>
    </div>
  );
}

export default App;
