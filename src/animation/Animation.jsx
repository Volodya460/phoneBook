import css from "./Animation.module.css";

export const Animation = ({ children }) => {
  return (
    <div className={css.animationBody}>
      <div className={css.ring}>
        <i style={{ color: "#00ff0a" }}></i>
        <i style={{ color: "#ff0057" }}></i>
        <i style={{ color: "#fffd44" }}></i>
        {children}
      </div>
    </div>
  );
};
