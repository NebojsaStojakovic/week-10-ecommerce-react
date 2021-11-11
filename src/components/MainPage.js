import React from 'react'
import Menu from './Menu'
import Categories from './Categories'
import Search from './Search'

export default function MainPage({ categories, filterItems, menuItems, setCartItems, setModalItem, searchValue, searchFilter }) {
    return (
        <>
            <div className="main__filters">
                <Categories categories={categories} filterItems={filterItems} />
                <Search searchValue={searchValue} searchFilter={searchFilter} />
            </div>
            <Menu menuItems={menuItems} setCartItems={setCartItems} setModalItem={setModalItem} />
        </>
    )
}
