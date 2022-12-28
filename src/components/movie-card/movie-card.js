import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { intlFormat } from 'date-fns';

import {
  Card, Layout, Progress, Rate, Tag, Typography,
} from 'antd';
import MovieApiService from '../../services/moviedb';
import ProgressiveImage from '../progressive_image/progressive_image';
import { GenresContextConsumer } from '../genres-context/genres-context';

import './movie-card.css';

const { Paragraph } = Typography;

const { Sider, Content } = Layout;

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.api = new MovieApiService();
    this.state = {
      ratedMovies: sessionStorage.getItem('ratedMovies'),
    };
  }

  setProgressColor = (value) => {
    if (value > 7) {
      return '#66E900';
    }
    if (value > 5) {
      return '#E9D100';
    }
    if (value > 3) {
      return '#E97E00';
    }
    return '#E90000';
  };

  onMovieRate = (id, value) => {
    this.api.postMovieRate(id, value);
  };

  // eslint-disable-next-line consistent-return
  createRatedValue() {
    let { ratedMovies } = this.state;
    ratedMovies = JSON.parse(ratedMovies);

    // eslint-disable-next-line no-restricted-syntax
    for (const i in ratedMovies) {
      if (ratedMovies[i].movieId === this.props.id) {
        return ratedMovies[i].rate;
      }
    }
  }

  render() {
    const {
      title, releaseDate, overview, posterPath, voteAverage, genreIds,
    } = this.props;

    let date = 'no date';
    if (releaseDate && releaseDate !== '') {
      date = (
        <span className="date">
          {intlFormat(new Date(releaseDate), { year: 'numeric', month: 'long', day: 'numeric' })}
          {' '}
        </span>
      );
    }

    const rate = this.createRatedValue();

    return (
      <Card bordered={false}>
        <Layout>
          <Sider>
            <ProgressiveImage posterPath={posterPath} />
          </Sider>
          <Content>
            <h3 className="title">{title}</h3>
            {date}
            <Progress
              type="circle"
              percent={voteAverage * 10}
              format={(percent) => (percent / 10).toFixed(1)}
              width={30}
              className="score"
              strokeColor={this.setProgressColor(voteAverage)}
            />
            <GenresContextConsumer>
              {(genres) => genreIds.map((elem) => {
                let newElem = (
                  <Tag className="genre-wrapper" key={elem.id}>
                    Unknown genre
                  </Tag>
                );
                genres.forEach((genre) => {
                  if (elem === genre.id) {
                    newElem = (
                      <Tag className="genre-wrapper" key={genre.id}>
                        {genre.name}
                      </Tag>
                    );
                  }
                });
                return newElem;
              })}
            </GenresContextConsumer>
            <Paragraph ellipsis={{ rows: 3 }}>{overview}</Paragraph>
            <Rate
              count={10}
              defaultValue={rate}
              allowHalf
              style={{
                fontSize: '14px',
                textAlign: 'center',

                bottom: '15px',
                margin: '8px 0',
              }}
              onChange={(value) => this.onMovieRate(this.props.id, value)}
            />
          </Content>
        </Layout>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number),
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
  releaseDate: PropTypes.string,
  voteAverage: PropTypes.number.isRequired,
};

MovieCard.defaultProps = {
  genreIds: [],
  posterPath: null,
  releaseDate: null,
};
