import React from "react";
import styles from "./Header.module.scss";
import { MenuIcon, SearchIcon, UserCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>Web project</h1>
      {/* <div>
        <Image
          src="https://media.discordapp.net/attachments/961992723005575238/962007200618922065/unknown.png"
          objectFit="contain"
          objectPosition="left"
          layout="fill"
          alt="logo"
        />
      </div> */}
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search a location"
          className={styles.input}
        />
        <div className={styles.searchIcon}>
          <SearchIcon />
          <span className={styles.searchText}>Search</span>
        </div>
      </div>
      <div className={styles.user}>
        <MenuIcon className={styles.menuIcon} />
        <UserCircleIcon className={styles.userCircleIcon} />
      </div>
    </header>
  );
};

export default Header;
