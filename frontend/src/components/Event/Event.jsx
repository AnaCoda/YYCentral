import { IconButton } from "@mui/material";
import React from 'react';
import { setEvent } from "../../redux/reducers/appSlice";
import styles from './Event.module.scss';
import { useDispatch } from "react-redux";

export default function Event({event}) {

   const dispatch = useDispatch();

   function exit(){
      dispatch(setEvent(null));
   }

   return (
      <div className={styles.event}>
         <div className={styles.title}>
            {event.title}
            <IconButton onClick={exit}>
               exit
            </IconButton>
         </div>
         <div className={styles.details}>
            <div className={styles.rating}>
               5 star rating :O
            </div>
            <div className={styles.tags}>
               tech
            </div>
            <div className={styles.location}>
               {event.location}
            </div>
            <div className={styles.phone}>
               {event.phone}
            </div>
         </div>
         <div className={styles.description} dangerouslySetInnerHTML={{__html: event.description}} />
         
      </div>
   )
}
