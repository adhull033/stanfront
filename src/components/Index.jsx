import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap"
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet";



// HOME PAGE COMPONENTS
import About_us from './newhome';

// ICONS
import { FiSearch } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { propertyData, searchData } from "../Redux/Slice";
import wp from "../assets/watsappicon.png";
import wp1 from "../assets/call.png";



function Index() {
  const [queryArea, setQueryArea] = useState([]);
  const [searchArea, setSearchArea] = useState();
  const [selectedValue, setSelectedValue] = useState('');
  const [alert, setAlert] = useState(false)
  const [successMessage, setSuccessMessage] = useState('');
  // SEND ONE COMPONENT TO ANOTHER COMPONENT
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  //     await axios.get(`${process.env.REACT_APP_API_URL}/api/properties/search/?location=bangalore&area=${searchArea}&bedroom=${selectedValue}`)
  const sendData = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/api/properties/search/?location=bangalore&&searchQuery=${searchArea}`)
        .then((response) => {
          setQueryArea(response?.data?.data)

          dispatch(searchData({ searchLists: response?.data?.data }))
          dispatch(propertyData({ propertyLists: [] }))
          Navigate('/properties')
        })
    } catch (error) {
      setSuccessMessage('Such a location not exist!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    }
  }

  // SELECT FUNCTION
  const handleSelectChange = (event) => {
    console.log("select value", event.target.value);
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Helmet>
        <meta name="title" content="Find Your Dream Home in Bangalore – Exclusive Listings and Expert Advice - Stanely-Estate" />
        <title>Stanely-Estate</title>
        <meta
          name="description"
          content="Discover a wide range of luxury homes, condos, and apartments for sale in Bangalore. Our experienced real estate agents are here to guide you through the buying process. Start your search today and find your dream home."
        />
      </Helmet>
      
      <About_us />
    
      { /*
      //<Featured_property />
      //<Virtual_tour />
    
      //<Luxury_carousel />
      //<Video_section />
      */}
      {/* <Clients_feedback /> */}
    </>
  );
}

export default Index;