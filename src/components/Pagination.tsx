import { useGlobalContext } from "@/context/appContext";
import React from "react";

const Pagination = (props: { pageCount: number }) => {
  const { state, setPage } = useGlobalContext();
  const prev = () => {
    state.page > 1 && setPage(state.page - 1);
  };
  const next = () => {
    state.page < props.pageCount && setPage(state.page + 1);
  };
  return (
    <div className="pagination">
      <button className={state.page == 1 ? "disabled" : "btn"} onClick={prev}>
        prev
      </button>
      <span>
        {state.page} out of {props.pageCount}
      </span>
      <button
        className={state.page < props.pageCount ? "btn" : "disabled"}
        onClick={next}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
