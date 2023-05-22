import Image from 'next/image';
import styles from './preloader.module.css';
import preloader from '@/assets/preloader.svg';

export const Preloader = () => (
  <div className={styles.preloader}>
    <Image src={preloader} alt={'loading...'} />
  </div>
);
