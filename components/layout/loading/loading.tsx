/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={styles.loader}>
       <img
          className={styles.image}
          src="/svg/netflix.svg"
          alt="Netflix logo"
          
        />
    </div>
  );
};

export default Loading;