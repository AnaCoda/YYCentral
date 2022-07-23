import React from 'react';
import styles from './Card.module.scss';

export default function Card({title, children}) {
   return (
      <div className={styles.wrapper}>
         <div 
            className={styles.card} 
         >
            <div className={styles.card__header}>
               <h1 className={styles.card__header__title}>
                  {title}
               </h1>
            </div>
            <div className={styles.card__body}>
               {children}
            </div>
         </div>
      </div>
   );
}
