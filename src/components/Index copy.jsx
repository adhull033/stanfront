import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap"

// HOME PAGE COMPONENTS
import About_us from '../components/About_us';
import Clients_feedback from '../components/Clients_feedback';
import Featured_property from '../components/Featured_property';
import Luxury_carousel from '../components/Luxury_carousel';
import Video_section from '../components/Video_section';
import Virtual_tour from '../components/Virtual_tour';
// ICONS
import { FiSearch } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { propertyData, searchData } from "../Redux/Slice";
import wp from "../assets/watsappicon.png";
import wp1 from "../assets/call.png";
import { Helmet } from "react-helmet";

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
    <meta name="title" content="Find Your Dream Home in Bangalore – Exclusive Listings and Expert Advice - Stanely-Estate"/>
    <title>Stanely-Estate</title>
    <meta
      name="description"
      content="Discover a wide range of luxury homes, condos, and apartments for sale in Bangalore. Our experienced real estate agents are here to guide you through the buying process. Start your search today and find your dream home."
    />
    </Helmet>
   
      <section className="bg-01 section01">

        <div className="container">
          {/* row 1*/}
          <div className="row header1 ">
            <div className="col-lg-2 col-md-3 col-sm-8 pt-5">
              <div className="text text-end">
                <button type="submit" className="btn-location-1">
                  <CiLocationOn className="space" />Bangalore</button>
              </div>
            </div>
            {/* Second Column  */}
            <div className="col-lg-4 pt-5">
              <input type="text" placeholder="Localities" onChange={(ev) => { setSearchArea(ev.target.value) }} className="input-box" />
            </div>
            {/* <div className="col-lg-4 pt-5">
              <select name="bhk" id="bhk" className=" custom-select w-100" onChange={handleSelectChange}>
                <option value="0">Bedrooms</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5 BHK</option>
              </select>
            </div> */}
            <div className="col-lg-2 pt-5">
              <button type="submit" onClick={sendData} className="booknow-btn-1 "><FiSearch className="bold" /></button>
            </div>
            {/* <div className="col-lg-7 col-md-8 col-sm-12 pt-5  ">
              <div className="mb-5 btn-location">
                <FiSearch className="bold" />
                <input placeholder="Select by locations, Property, budget" onChange={(ev) => { setSearchArea(ev.target.value) }} className="input-box " />
                <button type="submit" onClick={sendData} className="booknow-btn-1 align-text-end">Search</button>
              </div>
            </div> */}

          </div>
          <div className="row d-flex align-items-center justify-content-center mt-3">
            <div className="col-lg-5 text-center"><div> {successMessage && <Alert variant="success">{successMessage}</Alert>}</div></div>
          </div>

          <div className="row header2 ">
            <div className="col p-2">
              <div className="headericon-text">
                <p className="bannertxt text-center">Architect Your Idea to</p>
              </div>
              <h1 className="bannertxt02">Dream Home!</h1>
            </div>
          </div>
        </div>
        <a href="https://wa.me/9620675555?text=Hello%20!" target="_blank" className="wtbtn  btn-circle  fixedbutton-whatsapp1" id="webcall" role="button" type="button">
          <i className="fa fa-whatsapp"></i>
          <img src={wp} alt="watsapp icon" className="wapp-wh" />
        </a>
        <a href="tel:+919620675555" className="wtbtn  btn-circle  fixedbutton-whatsapp1" id="call" role="button" type="button">
          <img src={wp1} alt="call icon" className="wapp-wh1" />
        </a>
      </section>
      {/* MOBILE VIEW */}
      <section className="section002 pt-3  text-center">
        <div className="container">
          <div className="row">
            <div className="col-10">
              <div className="mb-5 ">
                <input onChange={(ev) => { setSearchArea(ev.target.value) }} placeholder="Search by locality " className="btn-location" />
              </div>
            </div>
            <div className="col-2">
              <div className="btn-location">
                <FiSearch onClick={sendData} className="bold" />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div> {successMessage && <Alert variant="success">{successMessage}</Alert>}</div>
          </div>
        </div>
      </section>

      <Featured_property />
      <Virtual_tour />
      <About_us />
      <Luxury_carousel />
      <Video_section />
      {/* <Clients_feedback /> */}
    </>
  );
}

export default Index;