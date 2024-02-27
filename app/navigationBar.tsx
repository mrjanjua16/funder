import React from 'react';
import styles from './NavigationBar.module.css';

export default function NavigationBar() {
  return (
    <div className={styles.navbar}>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
    </div>
  )
};