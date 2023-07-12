"use client"
import { useContext } from 'react';
import styles from './page.module.css';
import { ToogleContext } from '@/store/context';
import Carosile from '@/components/Carosile/Carosile';
import BookShell from '@/components/BookShell/BookShell';
import Counter from '@/components/counter/Counter';
import Contact from '@/components/Contact/Contact';

export default function page() {
  const {toogle} = useContext(ToogleContext);
  return (
    <>
      <div className={ toogle === true ? "containerExpand" :styles.container}>
        <Carosile/>
        <BookShell/>
        <Counter/>
        <Contact/>
      </div>
    </>
  )
}
