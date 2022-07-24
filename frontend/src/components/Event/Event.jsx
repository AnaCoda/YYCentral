import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
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
         <div className={styles.header}>
            <h1 className={styles.header__title}>
               Event
            </h1>
            <IconButton className={styles.header__exit} onClick={exit}>
               <CloseIcon sx={{color: "white"}}/>
            </IconButton>
         </div>
         <div className={styles.body}>
            <div className={styles.title}>
               <h1>
                  {event.title}
               </h1>
               <ShoppingBagIcon sx={{flex: 0.1, margin: "1.25rem", fontSize:"2rem", color: "rgb(255, 196, 0)"}}/>
            </div>
            <div className={styles.details}>
               <div className={styles.rating}>
                  <StarIcon className={styles.rating}/>
                  <StarIcon className={styles.rating}/>
                  <StarIcon className={styles.rating}/>
                  <StarIcon className={styles.rating}/>
                  <StarIcon className={styles.rating}/>
               </div>
               <div className={styles.tags}>
                  <h1 className={styles.details__header}>
                     Tags
                  </h1>
                  <div className={styles.details__content}>
                     Tech, Hackathon, Food
                  </div>
               </div>
               <div className={styles.location}>
                  <h1 className={styles.details__header}>
                     Location
                  </h1>
                  <div className={styles.details__content}>
                     {event.location}
                  </div>
               </div>
               <div className={styles.phone}>
                  {event.phone}
               </div>
            </div>
            <div className={styles.description} dangerouslySetInnerHTML={{__html: "<h1>Info</h1>" + event.description}} />
         </div>
         
      </div>
   )
}
