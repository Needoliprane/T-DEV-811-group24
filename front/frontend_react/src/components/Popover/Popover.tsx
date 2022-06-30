import React from "react";
import useOutsideClicker from "../../hooks/useClickOutside";

type Props = {
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
};

const Popover = ({ onClose, className, children }: Props) => {
  const ref = useOutsideClicker(onClose);
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default Popover;
