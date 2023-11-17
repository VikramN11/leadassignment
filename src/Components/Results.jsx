import React, { useEffect, useState } from 'react';
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getlocationfailure, getlocationrequest, getlocationsuccess } from '../Redux/action';
import style from "../Styles/Results.module.css";

const Results = ({code, buttonClicked}) => {

    const dispatch = useDispatch();
  const {location, isLoading, isError} = useSelector(store =>{
    return {
      location: store.location,
      isLoading: store.isLoading,
      isError: store.isError,
    }
  }, shallowEqual);

  console.log(code);
  console.log(location, isLoading, isError);
  console.log(buttonClicked);

  //Get the Data
    const getData = () => {
        dispatch(getlocationrequest());
        axios.get(`https://api.zippopotam.us/in/${code}`).then(res =>{
          console.log(res.data);
          dispatch(getlocationsuccess(res.data));
        }).catch(err =>{
          console.log(err.message);
          dispatch(getlocationfailure())
        })
      }
    
      useEffect(()=>{
        if(buttonClicked){
          getData();
        }
      },[buttonClicked,code])

  
      return (
    <div className={style.result_div}>
      <h1>Result</h1>
    {buttonClicked ? (isLoading ? (
      // loading indicator while fetching data
      <p className={style.loading}>Loading...</p>
    ) : isError ? (
      // error message if there's an error
      <p className={style.error}>This postal code does not exist</p>
    ) : (
      // your data here
      location.length>0 ? (
        <div>
          <p>Post Code : {location[0]["post code"]}</p>
          <p>Country : {location[0]["country"]}</p>
          <p>State : {location[0]["places"][0]["state"]}</p>
          <h3>Places</h3>
          <div className={style.places}>
          {location[0]["places"]?.map((el, ind) =>(
            <div key={ind}>
              <p>Place Name : {el["place name"]}</p>
              <p>Longitude : {el.longitude}</p>
              <p>Latitude : {el.latitude}</p>
              <p>-----------------------</p>
            </div>
          ))}
          </div>
        </div>
      ) : (
        <p>This postal code does not exist</p>
      )
    )) : <p>Postal Code information will be display here...</p>}
    </div>
  )
}

export default Results