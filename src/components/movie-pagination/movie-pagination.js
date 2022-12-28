import React, { Component } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './movie-pagination.css';

export default class MoviePagination extends Component {
  onPageChange = (page) => {
    this.props.onPageChange(page);
  };

  itemRender = (page, type, originalElement) => {
    if (type === 'page') {
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
          defaultPageSize={20}
          showSizeChanger={false}
          itemRender={this.itemRender}
          hideOnSinglePage
        />
      </div>
    );
  }
}

MoviePagination.propTypes = {
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
