import styles from "./Button.module.css";
import React from "react";
interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
    color: "green" | "red" | "orange"
}
export const Button: React.FC<ButtonProps> = ({children, onClick, color, ...props}) =>  {
    const className = `${styles.top} ${styles[`top_${color}`]}`;

    return (
        <button className={styles.button} onClick={onClick} {...props}>
            <span className={className}> {children}
            </span>
        </button>
    );
  }