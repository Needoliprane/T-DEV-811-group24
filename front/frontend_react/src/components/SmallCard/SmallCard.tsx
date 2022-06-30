import React from "react";
import utils from "../../styles/utils.module.scss";
import styles from "./SmallCard.module.scss";
import { default as cn } from "classnames";
import Image from "next/image";

type Props = {
  city: string;
  description: string;
  image: string;
  distance: number;
  link: string;
};

const SmallCard = ({ image, city, description, distance }: Props) => {
  return (
    <div className={cn(styles.container, utils.card)} aria-label="small card">
      <div className={styles.imageContainer}>
        <img src={image} alt="city" className={styles.imageContainer} />
      </div>
      <div className={styles.contentContainer} aria-label="card content">
        <h3 className={styles.city}>{city}</h3>
        <p className={styles.description} aria-label="description">
          {description}
        </p>
        <span className={styles.distance} aria-label="distance">
          {distance} km
        </span>
      </div>
    </div>
  );
};

export default SmallCard;
