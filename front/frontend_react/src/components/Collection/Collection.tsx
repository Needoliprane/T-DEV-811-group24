import React from "react";
import styles from "./Collection.module.scss";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children?: React.ReactNode;
};

const Collection = ({ title, children, ...props }: Props) => {
  return (
    <section className={styles.container} aria-label="collection" {...props}>
      {title && (
        <h2 className={styles.title} aria-label="collection title">
          {title}
        </h2>
      )}
      <div className={styles.grid}>{children}</div>
    </section>
  );
};

export default Collection;
