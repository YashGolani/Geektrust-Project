import React from "react";

export const Pagination = ({ totalPages, pageno, setPageno, deleteMulti }) => {
  const pageNo = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNo.push(i);
  }
  const backBtn = () => {
    if (pageno !== 1) setPageno(pageno - 1);
  };
  const nextBtn = () => {
    if (pageno < totalPages) setPageno(pageno + 1);
  };
  return (
    <nav className="nav">
      <button className="btn-danger" onClick={() => deleteMulti()}>
        <span>Delete Selected</span>
      </button>
      <ul className="pagination">
        <li className="page-item">
          <button onClick={() => backBtn()} className="page-next">
            <a>{`<<`}</a>
          </button>
        </li>
        {pageNo.map((num) => (
          <li key={num} className={num === pageno ? "active" : "page-item"}>
            <button onClick={() => setPageno(num)} className="page-link ">
              {num}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button onClick={() => nextBtn()} className="page-next" active="true">
            <a>{`>>`}</a>
          </button>
        </li>
      </ul>
      <div></div>
    </nav>
  );
};
