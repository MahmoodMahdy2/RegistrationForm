import React from "react";
import _ from 'lodash'

const Pagination = (props) => {
const {itemCount, pageSize, onPageChange, currentPage} = props;
const pageCount = itemCount / pageSize;
// console.log(pageCount , pageSize);
const pages = _.range(1, pageCount+1);
    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => 
                <li className={page === currentPage? 'page-item active': 'page-item'}><a className="page-link"
                  onClick={()=>onPageChange(page)}>{page}</a></li>
                )}
            </ul>
        </nav>
    );
}
export default Pagination