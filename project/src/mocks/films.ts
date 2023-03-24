import { Films } from '../types/film';

export const filmList: Films = [
  {
    id: 1,
    name: 'Forrest Gump',
    posterImage: 'mocks/posters/forrest_gump_s.jpg',
    previewImage: '/mocks/previews/forrest_gump_m.jpg',
    backgroundImage: '/mocks/backgroundImages/forrest_gump_x.jpg',
    backgroundColor: '#c0dbee',
    videoLink: '/mocks/trailers/Forrest_Gump.mp4',
    previewVideoLink: '/mocks/trailers/Forrest_Gump.mp4',
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    rating: 8.8,
    scoresCount: 189,
    director: 'Robert Zemeckis',
    starring: [
      'Tom Hanks',
      'Robin Wright',
      'Gary Sinise'
    ],
    runTime: 142,
    genre: 'Drama',
    released: 1994,
    isFavorite: false
  },
  {
    id: 2,
    name: 'The Dark Knight',
    posterImage: '/mocks/posters/dark_knight_s.jpg',
    previewImage: '/mocks/previews/dark_knight_m.jpg',
    backgroundImage: '/mocks/backgroundImages/dark_knight_x.jpg',
    backgroundColor: '#6da3b5',
    videoLink: '/mocks/trailers/The_Dark_Knight.mp4',
    previewVideoLink: '/mocks/trailers/The_Dark_Knight.mp4',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    rating: 9.0,
    scoresCount: 104,
    director: 'Christopher Nolan',
    starring: [
      'Christian Bale',
      'Heath Ledger',
      'Aaron Eckhart'
    ],
    runTime: 152,
    genre: 'Action',
    released: 2008,
    isFavorite: false
  },
  {
    id: 3,
    name: 'Interstellar',
    posterImage: '/mocks/posters/interstellar_s.jpg',
    previewImage: '/mocks/previews/interstellar_m.jpg',
    backgroundImage: '/mocks/backgroundImages/interstellar_x.jpg',
    backgroundColor: '#debfa2',
    videoLink: '/mocks/trailers/Interstellar.mp4',
    previewVideoLink: '/mocks/trailers/Interstellar.mp4',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    rating: 8.6,
    scoresCount: 73,
    director: 'Christopher Nolan',
    starring: [
      'Matthew McConaughey',
      'Anne Hathaway',
      'Jessica Chastain'
    ],
    runTime: 169,
    genre: 'Adventure',
    released: 2014,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Gladiator',
    posterImage: '/mocks/posters/gladiator_s.jpg',
    previewImage: '/mocks/previews/gladiator_m.jpg',
    backgroundImage: '/mocks/backgroundImages/gladiator_x.jpg',
    backgroundColor: '#bd9055',
    videoLink: '/mocks/trailers/Gladiator.mp4',
    previewVideoLink: '/mocks/trailers/Gladiator.mp4',
    description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    rating: 8.5,
    scoresCount: 239,
    director: 'Ridley Scott',
    starring: [
      'Russel Crowe',
      'Joaquin Phoenix',
      'Connie Nielsen'
    ],
    runTime: 155,
    genre: 'Action',
    released: 2000,
    isFavorite: false
  },
  {
    id: 5,
    name: 'Shutter Island',
    posterImage: '/mocks/posters/shutter_island_s.jpg',
    previewImage: '/mocks/previews/shutter_island_m.jpg',
    backgroundImage: '/mocks/backgroundImages/shutter_island_x.jpg',
    backgroundColor: '#d9b3a8',
    videoLink: '/mocks/trailers/Shutter_Island.mp4',
    previewVideoLink: '/mocks/trailers/Shutter_Island.mp4',
    description: 'In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.',
    rating: 8.2,
    scoresCount: 315,
    director: 'Martin Scorsese',
    starring: [
      'Leonardo DiCaprio',
      'Emily Mortimer',
      'Mark Ruffalo'
    ],
    runTime: 138,
    genre: 'Thriller',
    released: 2010,
    isFavorite: false
  },
  {
    id: 6,
    name: 'The Gentlemen',
    posterImage: '/mocks/posters/the_gentlemen_s.jpg',
    previewImage: '/mocks/previews/the_gentlemen_m.jpg',
    backgroundImage: '/mocks/backgroundImages/the_gentlemen_x.jpg',
    backgroundColor: '#ffffff',
    videoLink: '/mocks/trailers/The_Gentlemen.mp4',
    previewVideoLink: '/mocks/trailers/The_Gentlemen.mp4',
    description: 'An American expat tries to sell off his highly profitable marijuana empire in London, triggering plots, schemes, bribery and blackmail in an attempt to steal his domain out from under him.',
    rating: 7.8,
    scoresCount: 94,
    director: 'Guy Ritchie',
    starring: [
      'Matthew McConaughey',
      'Charlie Hunnam',
      'Michelle Dockery'
    ],
    runTime: 113,
    genre: 'Crime',
    released: 2019,
    isFavorite: false
  },
  {
    id: 7,
    name: 'The Wolf of Wall Street',
    posterImage: '/mocks/posters/wall_street_s.jpg',
    previewImage: '/mocks/previews/wall_street_m.jpg',
    backgroundImage: '/mocks/backgroundImages/wall_street_x.jpg',
    backgroundColor: '#ffb919',
    videoLink: '/mocks/trailers/The_Wolf_of_Wall_Street.mp4',
    previewVideoLink: '/mocks/trailers/The_Wolf_of_Wall_Street.mp4',
    description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    rating: 8.2,
    scoresCount: 123,
    director: 'Martin Scorsese',
    starring: [
      'Leonardo DiCaprio',
      'Jonah Hill',
      'Margot Robbie'
    ],
    runTime: 180,
    genre: 'Biography',
    released: 2013,
    isFavorite: false
  },
  {
    id: 8,
    name: 'Upgrade',
    posterImage: '/mocks/posters/upgrade_s.jpg',
    previewImage: '/mocks/previews/upgrade_m.jpg',
    backgroundImage: '/mocks/backgroundImages/upgrade_x.jpg',
    backgroundColor: '#bc221a',
    videoLink: '/mocks/trailers/Upgrade.mp4',
    previewVideoLink: '/mocks/trailers/Upgrade.mp4',
    description: 'Set in the near-future, technology controls nearly all aspects of life. But when the world of Grey, a self-labeled technophobe, is turned upside down, his only hope for revenge is an experimental computer chip implant.',
    rating: 7.8,
    scoresCount: 304,
    director: 'Leigh Whannell',
    starring: [
      'Logan Marshall-Green',
      'Mellanie Vallejo',
      'Steve Danielsen'
    ],
    runTime: 104,
    genre: 'Sci-Fi',
    released: 2018,
    isFavorite: false
  }
];

