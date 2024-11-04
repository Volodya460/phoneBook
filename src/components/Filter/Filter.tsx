import { useSelector, useDispatch } from "react-redux";
import { filterChange, getInputFilter } from "../../redux/contactSlice";
import css from "./Filter.module.css";

export function Filter() {
  const filter: string | null = useSelector(getInputFilter) || "";
  const dispatch = useDispatch();
  return (
    <div className={css.filterBox}>
      <h2>Find Contacts by name</h2>
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          dispatch(filterChange(e.target.value.trim()));
        }}
        name="filter"
        className={css.filterInput}
      ></input>
    </div>
  );
}
