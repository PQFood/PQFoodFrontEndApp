import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UseGetOrderSearch = ({search,setOrderHistory, setIsSearch }) => {
    axios({
        method: 'get',
        url: '/waiter/getOrderSearch',
        params: {
            search: search
        }
    })
        .then(response => {
            setOrderHistory(response.data)
            setIsSearch(true)
        })
        .catch(error => {
            console.log(error)
        })
}
export default UseGetOrderSearch