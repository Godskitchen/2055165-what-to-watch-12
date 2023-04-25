import type { Films } from '../types/film';
import type { Reviews } from '../types/film';
import { UserInfo } from '../types/user-data';
import { internet } from 'faker';

export const fakeMovies: Films = [
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
  },

  {
    id: 9,
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
  },{
    id: 10,
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
  }, {
    id: 11,
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
  }, {
    id: 12,
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
  }, {
    id: 13,
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
  }, {
    id: 14,
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
  }, {
    id: 15,
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
  }, {
    id: 16,
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
  }, {
    id: 17,
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
  }, {
    id: 18,
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
  }, {
    id: 19,
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


export const fakeReviews: Reviews = [
  {
    filmId: 1,
    comment: 'I found this to be an entertaining film, certainly. However, I just don\t see it as one of the top 250 films of all time. Tom Hanks does a great job playing Forrest Gump throughout the film. Sally Field as his mother is also quite good, so the problem isn\'t with the acting. The story is a shade weak, I think. It skips around a good bit and ends up slightly disjointed.',
    date: 'Sun Mar 19 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 7.1,
    user: {
      id: 100,
      name: 'Timothy Young'
    }
  },
  {
    filmId: 1,
    comment: 'It\'s hilarious, and it is tragic. Tom Hanks is...amazing as Forrest Gump, striking the balance between "stupid" and "normal", as many choose to describe people. There\'s parts where you can feel how sad it is, but it\'s not crammed in there, or overpowering. It strikes the right balance with the comedy.',
    date: 'Sat Mar 18 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 2,
    rating: 9.8,
    user: {
      id: 101,
      name: 'Deborah Thomas'
    }
  },
  {
    filmId: 2,
    comment: 'What can I say, it was made by Christopher Nolan so it has to be good. Amazing action. Amazing characters. Amazing director. The Dark Knight has everything. I have no problems with this movie. But the thing keeping me back from giving this movie a 10 is that something about it just didn\'t fully connect with me.',
    date: 'Fri Mar 17 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 3,
    rating: 9.4,
    user: {
      id: 102,
      name: 'James Kelley'
    }
  },
  {
    filmId: 2,
    comment: 'The Dark Knight is an extraordinary mish-mash lacking logic and cohesion. Technically, the film is well made. That is, it looks and feels like a blockbuster, though a solid score is sorely lacking. On the plus side, Michael Caine and Gary Oldman add gravitas to an otherwise ordinary ensemble.',
    date: 'Thu Mar 16 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 4,
    rating: 5.5,
    user: {
      id: 103,
      name: 'Paula Williams'
    }
  },
  {
    filmId: 2,
    comment: 'The Dark Knight actually got lucky. Movies over the last six years have been crap. Scripts poorly written, over budgeted for the visual effect - yet not transferring well to the big screen, bad story ideas, copy cats of other films,lack of creativity, films that hold vulgarity and violence as a high standard of film making. That\'s what we\'ve had over the years. Now comes Batman - Dark Knight. Which is written well enough but whose aim isn\'t good story telling. It\'s written to move about from pointless spot to pointless spot until you reach the end. Why another Batman Joker movie? It\'s been done already.',
    date: 'Wed Mar 15 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 5,
    rating: 1.9,
    user: {
      id: 104,
      name: 'Shirley Hopkins'
    }
  },
  {
    filmId: 3,
    comment: 'This movie felt like it tried to accomplish two simultaneous and somewhat incompatible endeavors. First, it was thought-provoking. Many questions were raised. What would life on earth be like if our climate runs amok? What happens to government when we all have to live hand-to-mouth? Are "they" out there communicating with us? Is it the essence of humanity to survive, or is it to pioneer, and, by extension, evolve? Second, it was also an adventure. I watched this in a full IMAX theater, with eighty bajillion watts of Super Thunder-Round Sound, or whatever the kids call it now. The visual effects definitely shine on the IMAX screen. The format switches occasionally, and usually imperceptibly, between 70mm for the scenes with dialogue, to IMAX format for that full-on dose of retina-overload spectacle. This movie is a wonderfully fun ride through a strangely familiar extra-galactic world. There are also plenty of tense moments, after which you realize you\'ve been holding your breath.',
    date: 'Tue Mar 14 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 6,
    rating: 8.3,
    user: {
      id: 105,
      name: 'Edith Bell'
    }
  },
  {
    filmId: 4,
    comment: '"Gladiator" was too long which ensured it to be quite often very boring. What really bothers me is how overrated "Gladiator" is, upholding the tradition of all the modern day epic\'s. The simple minds of so many today fail to realize how uninspiring this movie was. It stuns me how audiences believe a movie is good when it\'s running time exceeds 150 minutes.',
    date: 'Mon Mar 13 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 7,
    rating: 6.0,
    user: {
      id: 106,
      name: 'Georgia Ramirez'
    }
  },
  {
    filmId: 4,
    comment: 'What really touched me was not its luxurious production level, exquisite historical props, simple costume design, textured photography, or a strong sense of war scene. What really touched me was the moment when he touched the wheat waves dancing with the wind, looked at the blue gray sky in the distance, and slowly set foot on the way home under the eyes of his wife and children. For me, those excellent productions are only the surface, and the scene of the warrior coming home is the real soul of the film.',
    date: 'Sun Mar 12 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 8,
    rating: 9.5,
    user: {
      id: 107,
      name: 'Richard Erickson'
    }
  },
  {
    filmId: 5,
    comment: 'The entire movie was boring, predictable, and I found myself not caring about any of the characters. From the first five minutes, the obvious and supposedly twisted ending is revealed all too easily for the careful watcher. It gives you a feeling that the creators of this film don\'t think the audience can figure things out for themselves.',
    date: 'Sat Mar 11 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 9,
    rating: 4.5,
    user: {
      id: 108,
      name: 'Hazel Hamilton'
    }
  },
  {
    filmId: 5,
    comment: 'I was told on several occasions to skip this film. While I felt it took a long way to get to the point, I found it intriguing and engaging. I\'ve really grown to like DeCaprio and find him to be an interesting actor. One reviewer did criticize him for hanging around the dark side a bit much, but that could be said about Nicholson and a host of others. This is one of those mind puzzles that force one to guess a good deal.',
    date: 'Fri Mar 10 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 10,
    rating: 8.2,
    user: {
      id: 109,
      name: 'Gina Robinson'
    }
  },
  {
    filmId: 6,
    comment: 'Ugh... This felt like it was written by a 16 year old who just watched Snatch for the first time.',
    date: 'Thu Mar 9 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 11,
    rating: 5.2,
    user: {
      id: 110,
      name: 'Jim Jones'
    }
  },
  {
    filmId: 6,
    comment: 'It shows how to be the king of jungle not just by acting but be the king. The story telling by Hugh is ok. The becoming of kingpin is shown quickly but is justified by the way he plans everything and executes it. loyality over anything. Some open ends. But overall funny. The slieght of hand by Guy Ritchie is impressive.',
    date: 'Wed Mar 8 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 12,
    rating: 7.1,
    user: {
      id: 111,
      name: 'Kyle Edwards'
    }
  },
  {
    filmId: 7,
    comment: 'The title of the film and its director were clearly enough to warrant seeing this one. But I was annoyed at how poor the acting was, and the incessant ultra-sharp close-ups of bad actors speaking mindless dialog made it too hard to watch more than the first half. While the storyline had a decent premise, its portrayal was shallow at best.',
    date: 'Tue Mar 7 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 13,
    rating: 2.9,
    user: {
      id: 112,
      name: 'Richard Scott'
    }
  },
  {
    filmId: 7,
    comment: 'The movie Leonardo DiCaprio should have gotten an Oscar for. His portrayal of the character is perfect. The movie is well-written, leaving no details out of the original story. Martin Scorsese never fails to impress.',
    date: 'Mon Mar 6 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 14,
    rating: 10.0,
    user: {
      id: 113,
      name: 'Jane Cunningham'
    }
  },
  {
    filmId: 8,
    comment: 'I\'ll give this film credit for putting a fresh spin on the overdone revenge film. The action is very unique, while also evoking memories of the Wachowskis\' work on The Matrix. I really enjoyed the Vangelis-esque score used throughout.',
    date: 'Sun Mar 5 2023 17:06:32 GMT+0300 (Москва, стандартное время)',
    id: 15,
    rating: 8.2,
    user: {
      id: 114,
      name: 'Armando Wallace'
    }
  },
];

export const fakeUser: UserInfo = {
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: 5,
  name: internet.userName()
};


