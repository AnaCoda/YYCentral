import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import React from 'react';
import { setPopup } from "redux/reducers/appSlice";
import styles from './Card.module.scss';
import { useDispatch } from "react-redux";

export default function Card({title, children}) {
   const dispatch = useDispatch();

   function exit(){
      dispatch(setPopup(undefined));
   }

   return (
      <div className={styles.wrapper}>
         <div 
            className={styles.card} 
         >
            <div className={styles.header}>
               <h1 className={styles.header__title}>
                  {title.charAt(0).toUpperCase() + title.slice(1)}
               </h1>
               <IconButton className={styles.header__exit} onClick={exit}>
                  <CloseIcon sx={{color: "white"}}/>
               </IconButton>
            </div>
            <div className={styles.card__body}>
               {children}
            </div>
         </div>
      </div>
   );
}
