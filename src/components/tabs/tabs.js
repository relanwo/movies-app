// /* eslint-disable react/prop-types */
// import React, { Component } from 'react';
// import './tabs.css';
// import { Tabs } from 'antd';

// export default class MovieTabs extends Component {
//   onTabsChange = (tab) => {
//     if (tab === 'rated') {
//       this.props.onRate();
//     } else this.props.onSearch();
//   };

//   render() {
//     const tabsItems = [
//       { label: 'Search', key: 'search', children: [this.props.searchPanel, this.props.moviesList, this.props.pagination] },
//       { label: 'Rated', key: 'rated', children: [this.props.moviesList, this.props.pagination] },
//     ];
//     return (
//       <>
//         <Tabs
//           className="movie-tabs"
//           items={tabsItems}
//           defaultActiveKey="search"
//           destroyInactiveTabPane
//           onChange={(tabsKey) => this.onTabsChange(tabsKey)}
//         />
//         {/* {this.props.pagination} */}
//       </>
//     );
//   }
// }
