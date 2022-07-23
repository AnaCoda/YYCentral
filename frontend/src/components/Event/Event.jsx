import React from 'react';
import styles from './Event.module.scss';

export default function Event({event}) {
   return (
      <div className={styles.event}>
         <div className={styles.title}>
            {event.title}
         </div>
         <div className={styles.description}>
            {event.description}
         </div>
         
      </div>
   )
}
