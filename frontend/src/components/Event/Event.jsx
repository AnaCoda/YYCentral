import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import styles from './Event.module.scss';

export default function Event({event}) {
   const [selected, setSelected] = React.useState("info");

   return (
      <div className={styles.event}>
         <Details info={event} />
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
         {
            selected === "info" ? (
               <Info info={event}/>
            ) : (
               <EventCard event={event}/>
            )
         }
      </div>
   )
}


export function Details({info}){
   const tags = info.tags ? info.tags.split(",") : [];
   const [favorite, setFavorite] = React.useState(false);

   return (
      <div className={styles.details__wrapper}>
            <div className={styles.title}>
               <h1>
                  {info.title}
               </h1>
               <ShoppingBagIcon sx={{flex: 0.1, margin: "1.25rem", fontSize:"2rem", color: "rgb(255, 196, 0)"}}/>
            </div>
            <div className={styles.details}>
               <div className={styles.info}>
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
                        {
                           tags.map((tag) => (
                              <>{tag}, &nbsp;</>
                           )) ?? (
                              "Tech, Hackathon, Food"
                           )
                           
                        }
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
               <div className={styles.like} onClick={() => setFavorite(!favorite)}>
                  {
                     !favorite ? (
                        <FavoriteBorderIcon sx={{margin: "1.25rem", fontSize:"2rem", color: "rgb(255, 196, 0)"}}/>
                     ) : (
                        <FavoriteIcon sx={{margin: "1.25rem", fontSize:"2rem", color: "rgb(255, 196, 0)"}}/>
                     )
                  }
               </div>
            </div>
      </div>
   )
}

// Info component
export function Info({info}) {
   return (
      <div className={styles.info}>
         <div className={styles.body}>
            <div className={styles.description} dangerouslySetInnerHTML={{__html: "<h1>Info</h1>" + info.description}} />
            <div className={styles.reviews}>
               <h1 className={styles.details__header}>
                  Reviews
               </h1>
               <div className={styles.reviews__content}>
                  <Review review={{name: "pandy zhou", rating: 5, date: "July 10, 2022",comment: "i love this place"}}/>
                  <Review review={{name: "jim geng", rating: 5, date: "June 9, 2022", comment: "this is a comment"}}/>
                  <Review review={{name: "jimothy geng", rating: 5, date: "April 20, 2022",comment: "this is a comment"}}/>
                  <Review review={{name: "allan kong", rating: 5, date: "Jan. 10, 2022",comment: "this is a comment"}}/>
                  <Review review={{name: "allan bob", rating: 5, date: "August 10, 2021",comment: "this is a comment"}}/>
               </div>
            </div>
          </div>
      </div>
   );
}

// Restaurant component
export function Restaurant({restaurant}) {

   return (
      <div className={styles.restaurant}>
         <Details info={restaurant}/>
         <Info info={restaurant}/>
      </div>
   )
}

export function EventCard({event}) {
   return (
      <div className={styles.eventCard}>
         Event {event.title}
      </div>
   )
}

export function Review({review}){
   return (
      <div className={styles.review}>
         <div className={styles.review__header}>
            <h1>
               {review.name}
            </h1>
            <div className={styles.review__rating}>
               <div className={styles.stars}>
                  {
                     [...Array(review.rating)].map((_, i) => (
                        <StarIcon className={styles.rating}/>
                     ))
                  }
               </div>

               <div className={styles.review__date}>
                  {review.date}
               </div>

            </div>
         </div>
         <div className={styles.review__body}>
            <div className={styles.review__content}>
               {review.comment}
            </div>
         </div>
      </div>
   );
}