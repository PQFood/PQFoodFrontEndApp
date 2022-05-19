import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UseGetOrderSearch = ({search,setOrderHistory, setIsSearch }) => {
    // setLoading(true)
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
            setLoading(fasle)
        })
        .catch(error => {
            console.log(error)
        })
}
export default UseGetOrderSearch