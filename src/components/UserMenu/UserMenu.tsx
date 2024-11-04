import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getIsLoading,
  getUserName,
  getUserSubscription,
} from "../../redux/auth/authSlice";
import {
  changeUserSubscription,
  logOut,
} from "../../redux/auth/authOperations";
import css from "./UserMenu.module.css";
import { UserLoader } from "../../assets/loaders/UserLoader.jsx";
import { AppDispatch } from "../../redux/store";

export default function UserMenu() {
  const userName = useSelector(getUserName);
  const userSubscription = useSelector(getUserSubscription);
  const userLoading = useSelector(getIsLoading);
  const dispatch = useDispatch<AppDispatch>();

  const changeSub = (sub: "starter" | "pro") => {
    dispatch(changeUserSubscription({ subscription: sub }));
  };

  const buttonSub = () => (
    <button
      onClick={() =>
        changeSub(userSubscription === "starter" ? "pro" : "starter")
      }
    >
      {userSubscription === "starter"
        ? "Get Pro Subscription"
        : "Unsubscribe Pro Subscription"}
    </button>
  );
  return (
    <div className={css.userBox}>
      <ul className={css.userInfo}>
        <li>
          <p>{userName}</p>
        </li>
        <li>
          <p>subscription: {userSubscription}</p>
        </li>
      </ul>
      <div className={css.buttonBox}>
        <button onClick={() => dispatch(logOut())}>Logout</button>
        {userLoading ? <UserLoader /> : buttonSub()}
      </div>
    </div>
  );
}
