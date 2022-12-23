import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import './search-panel.css';

export default class SearchPanel extends Component {
  searchQuery = debounce((val) => this.props.onSearch(val), 500);

  state = {
    search: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState === this.state) return;

    this.searchQuery(this.state.search);
  }

  onSearchPanelChange = (e) => {
    this.setState(() => ({ search: e.target.value }));
  };

  render() {
    return <input className="search-panel" placeholder="Type to search..." onChange={this.onSearchPanelChange} />;
  }
}

SearchPanel.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
