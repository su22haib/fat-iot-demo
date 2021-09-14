import React, {useState} from 'react';

function Parametric1(){

    const [Ana1, setAna1] = useState([]);
    const [Ana2, setAna2] = useState([]);


    useEffect(() => {
        serial.on('Serial', Analog => {   //dummy async function, for 
          setData(currentData => [...currentData, Analog]);             //The setData function updates the data array, takes
        });
      }, []);
}