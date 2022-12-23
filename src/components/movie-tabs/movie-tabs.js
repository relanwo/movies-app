/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import './tabs.css';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

export default class MovieTabs extends Component {
  onTabsChange = (tab) => {
    if (tab === 'rated') {
      this.props.onRated();
    } else this.props.onSearch();
  };

  render() {
    const tabsItems = [
      { label: 'Search', key: 'search', children: [this.props.searchPanel, this.props.content] },
      { label: 'Rated', key: 'rated', children: this.props.content },
    ];
    return (
      <Tabs
        className="movie-tabs"
        items={tabsItems}
        defaultActiveKey="1"
        destroyInactiveTabPane
        onChange={(tabsKey) => this.onTabsChange(tabsKey)}
      />
    );
  }
}

MovieTabs.propTypes = {
  // onRated: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  // onPageChange: PropTypes.func.isRequired,
};
