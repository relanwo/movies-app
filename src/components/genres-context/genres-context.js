import React from 'react';

// const GenresContext = React.createContext();
const { Provider: GenresContextProvider, Consumer: GenresContextConsumer } = React.createContext();

// export default GenresContext;
export { GenresContextProvider, GenresContextConsumer };
