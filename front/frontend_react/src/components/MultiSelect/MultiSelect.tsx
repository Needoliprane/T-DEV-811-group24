import React, { useState } from "react";
import useOutsideClicker from "../../hooks/useClickOutside";
import styles from "./MultiSelect.module.scss";
import utilsStyles from "styles/utils.module.scss";
import cn from "classnames";

type Props = {
  label: string;
  options?: { label: string; color?: string }[];
  selection: string[];
  onSelect: (value: string) => void;
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const MultiSelect = ({
  label,
  options,
  selection,
  onSelect: handleSelect,
  onSearch: handleSearch,
  className,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useOutsideClicker(() => setIsActive(false));
  const btnIdleStyle = (color = "#000000") =>
    ({
      backgroundColor: "white",
      color: color,
      borderColor: color,
    } as React.CSSProperties);
  const btnActivatedStyle = (color = "#000000") =>
    ({
      borderColor: color,
      backgroundColor: color,
      color: "white",
    } as React.CSSProperties);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsActive(true)}
        className={`${styles.button} ${isActive ? styles.isActive : null}`}
      >
        {label}
        {selection.length > 0 && <strong> {selection.length}</strong>}
      </button>
      {isActive && (
        <div role="list" className={cn(styles.overlay, className)} ref={ref}>
          {handleSearch && (
            <input
              type="search"
              className={cn(utilsStyles.searchbar, styles.searchbar)}
              onChange={handleSearch}
            />
          )}
          {options?.map((opt) => (
            <div
              className={styles.item}
              style={
                selection.includes(opt.label)
                  ? btnActivatedStyle(opt.color)
                  : btnIdleStyle(opt.color)
              }
              onClick={() => handleSelect(opt.label)}
              key={opt.label}
            >
              {opt.label}
            </div>
          ))}
          {!options?.length && (
            <div className={styles.empty}>Aucun filtre disponible</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
