import Image from "next/image";
import React from "react";
import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.container}>
      <Image
        src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        layout="fill"
        objectFit="cover"
        objectPosition="left"
        alt="background"
      />
      <div className={styles.discoverContainer}>
        <p className={styles.text}>Discover activities nearby !</p>
        <button className={styles.button}>Learn more</button>
      </div>
    </div>
  );
};

export default Banner;
