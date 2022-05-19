import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UseGetShipSearch = ({search,setBookShip, setIsSearch }) => {
    axios({
        method: 'get',
        url: '/shipper/getShipSearch',
        params: {
            search: search
        }
    })
        .then(response => {
            setBookShip(response.data)
            setIsSearch(true)
        })
        .catch(error => {
            console.log(error)
        })
}
export default UseGetShipSearch