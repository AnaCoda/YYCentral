import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import styles from './Event.module.scss';

export default function Event({event}) {
   const [selected, setSelected] = React.useState("info");

   return (
      <div className={styles.event}>
         {/* <div className={styles.header}>
            <h1 className={styles.header__title}>
               Event
            </h1>
            <IconButton className={styles.header__exit} onClick={exit}>
               <CloseIcon sx={{color: "white"}}/>
            </IconButton>
         </div> */}
         <div className={styles.toggle}>
            <ToggleButtonGroup
               value={selected}
               exclusive
               onChange={(event, value) => setSelected(value)}
               sx={{
                  margin: "1rem 0 0 0",
                  ".Mui-selected": {
                     backgroundColor: "#c81042 !important",
                     color: "white !important",
                     "&:hover": {
                        backgroundColor: "#c81042 !important",
                        color: "white !important"
                     }
                  },
                  "&:hover": {
                     backgroundColor: "rgba(255, 255, 255, 0.1)",
                     color: "white !important"
                  }
               }}
            >
               <ToggleButton value="events">
                  Events
               </ToggleButton>
               <ToggleButton value="info">
                  Info
               </ToggleButton>
            </ToggleButtonGroup>
         </div>
         <Info info={event}/>
      </div>
   )
}


// Info component
export function Info({info}) {

   return (
      <div className={styles.info}>
         
         <div className={styles.body}>
            <div className={styles.title}>
               <h1>
                  {info.title}
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
                     {info.location}
                  </div>
               </div>
               {
                  info.phone &&
                  (
                     <div className={styles.phone}>
                        <h1 className={styles.details__header}>
                           Phone
                        </h1>
                        <div className={styles.details__content}>
                           {info.phone}
                        </div>
                     </div>
                  )
               }
            </div>
            <div className={styles.description} dangerouslySetInnerHTML={{__html: "<h1>Info</h1>" + info.description}} />
         </div>
      </div>
   );
}

// Restaurant component
export function Restaurant({restaurant}) {

   return (
      <div className={styles.restaurant}>
         <Info info={restaurant}/>
      </div>
   )
}