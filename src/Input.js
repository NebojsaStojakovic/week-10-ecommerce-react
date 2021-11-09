import React from 'react'

const Input = ({searchFilter}) => {

    return (
        <div>
            <input className="search-input" type="search" placeholder="Search item" onChange={(e)=> searchFilter(e.target.value)}/>
        </div>
    )
}

export default Input
