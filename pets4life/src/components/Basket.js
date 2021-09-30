import React, {useState} from 'react';
import '../App'


const Basket = ({ basket }) => {
    let total = 0
    for (let i = 0; i < basket.length; i++) {
        const item = basket[i];
        total += parseInt(item.price)
    }

    return (
        <div className = "Total">
            <h2 id="total2">Your Items:</h2>
            <ul>
                {basket.map((item, index) => (
                    <li key={index}>
                        <h4>{item.breed}</h4>
                    </li>
                ))}
            </ul>
            <h4 id="total">£{total} total</h4>
            <div id="buttoncontainer">
            <button id="button">Pay Now</button>
            </div>
        </div>
        
    )
}


export default Basket
