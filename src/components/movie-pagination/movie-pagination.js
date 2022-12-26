/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Pagination } from 'antd';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import './movie-pagination.css';
// import 'antd/dist/antd.css';

export default class MoviePagination extends Component {
  onPageChange = (page) => {
    this.props.onPageChange(page);
  };

  itemRender = (page, type, originalElement) => {
    if (type === 'page') {
      // eslint-disable-next-line no-console
      // console.log(this.props.total);
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      return <span onClick={() => this.onPageChange(page)}>{page}</span>;
    }
    return originalElement;
  };

  render() {
    return (
      <div className="movie-pagination">
        <Pagination
          total={this.props.total}
          // pageSize={20}
          // eslint-disable-next-line react/prop-types
          // pageSize={this.props.key === 'search' ? 1 : 20}
          defaultPageSize={20}
          showSizeChanger={false}
          // showQuickJumper={false}
          itemRender={this.itemRender}
          hideOnSinglePage
        />
      </div>
    );
  }
}

MoviePagination.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  // totalPages: PropTypes.number.isRequired,
  // onPageChange: PropTypes.func.isRequired,
};
