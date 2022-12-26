import { Component } from 'react';
// import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './progressive_image.css';
// const loader = <Spin style={{ fontSize: 12 }} />;

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    const { loading } = this.state;
    // eslint-disable-next-line react/prop-types
    const { posterPath } = this.props;

    const poster = posterPath === null
      ? 'https://critics.io/img/movies/poster-placeholder.png'
      : `https://image.tmdb.org/t/p/w500${posterPath}`;
    return (
      <>
        {loading ? <Spin /> : null}
        <img
          className="poster"
          alt="film preview"
          // style={loading ? { display: 'none' } : {}}
          src={poster}
          onLoad={() => this.setState({ loading: false })}
        />
      </>
    );
  }
}
