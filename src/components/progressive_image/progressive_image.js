import { Component } from 'react';
import { Spin } from 'antd';
import { PropTypes } from 'prop-types';

import './progressive_image.css';

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    const { loading } = this.state;
    const { posterPath } = this.props;

    const poster = posterPath === null
      ? 'https://critics.io/img/movies/poster-placeholder.png'
      : `https://image.tmdb.org/t/p/w500${posterPath}`;
    return (
      <>
        {loading ? <Spin /> : null}
        <img className="poster" alt="film preview" src={poster} onLoad={() => this.setState({ loading: false })} />
      </>
    );
  }
}

ProgressiveImage.propTypes = {
  posterPath: PropTypes.string,
};

ProgressiveImage.defaultProps = {
  posterPath: null,
};
