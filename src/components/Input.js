import React from 'react'
import { RiSearchLine } from "react-icons/ri";

const Input = ({ searchFilter, searchValue }) => {
    return (
        <div className="input__box">
            <input value={searchValue} className="search-input" type="search" placeholder="Search item" onChange={e => searchFilter(e.target.value)} />
            <RiSearchLine className="search-icon" />
        </div>
    )
}

export default Input
