import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getIsLoading,
  getUserName,
  getUserSubscription,
} from "../../redux/auth/authSlice.js";
import {
  changeUserSubscription,
  logOut,
} from "../../redux/auth/authOperations.js";
import css from "./UserMenu.module.css";
import { UserLoader } from "../../assets/loaders/UserLoader.jsx";

export default function UserMenu() {
  const userName = useSelector(getUserName);
  const userSubscription = useSelector(getUserSubscription);
  const userLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();

  const changeSub = (sub) => {
    let subscription = {
      subscription: sub,
    };

    dispatch(changeUserSubscription(subscription));
  };
  const buttonSub = () => {
    if (userSubscription === "starter") {
      return (
        <button onClick={() => changeSub("pro")}>Get Pro Subscription</button>
      );
    } else {
      return (
        <button onClick={() => changeSub("starter")}>
          Unsubscribe Pro Subscription
        </button>
      );
    }
  };
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
