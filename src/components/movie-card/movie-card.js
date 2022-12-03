import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import { Card, Layout } from 'antd';

import './movie-card.css';

const { Sider, Content } = Layout;

export default class MovieCard extends Component {
  // eslint-disable-next-line class-methods-use-this
  textShortener = (text, amountOfWords = 35) => {
    const arr = text
      .split(' ')
      .slice(0, amountOfWords - 1)
      .join(' ');
    return `${arr} ...`;
  };

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      id,
      title,
      releaseDate,
      genreIds,
      overview,
    } = this.props;
    // posterPath
    const genreLabel = genreIds.map((genre, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <span className="genre-wrapper" key={index}>
        {genre}
      </span>
    ));
    // eslint-disable-next-line no-console
    // console.log(typeof this.textShortener);
    return (
      <Card bordered={false}>
        {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
        {/* <div className="content-wrapper"> */}
        <Layout>
          <Sider>
            {/* <img className="poster" alt="poster" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
          </Sider>
          <Content>
            <h3 className="title">{title}</h3>
            <span className="date">{format(parseISO(releaseDate), 'MMMM d, yyyy')}</span>
            <div className="genres">{genreLabel}</div>
            <p className="description">{this.textShortener(overview)}</p>
          </Content>
        </Layout>

        {/* </div> */}
      </Card>
    );
  }
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number),
  overview: PropTypes.string.isRequired,
};

MovieCard.defaultProps = {
  genreIds: [],
};
