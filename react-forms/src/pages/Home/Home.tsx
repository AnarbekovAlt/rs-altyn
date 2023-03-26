import React from 'react';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';
// import MainPage from '../../components/MainPage/MainPage';

const booksData = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genres: ['Fiction'],
    stock: true,
    bookType: 'Hardcover',
    published: 'July 11, 1960',
    pages: '281',
    image:
      'https://img3.labirint.ru/rc/38562df16b25bb65684e6b4d877e4bfc/363x561q80/books44/435633/cover.png?1613053509',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genres: ['Fiction'],
    stock: true,
    bookType: 'Hardcover',
    published: 'April 10, 1925',
    pages: '180',
    image:
      'https://img3.labirint.ru/rc/11497ddde49538c7cc4aad888b570629/363x561q80/books92/917093/cover.jpg?1671168338',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genres: ['Fiction'],
    stock: true,
    bookType: 'Paperback',
    published: 'June 8, 1949',
    pages: '328',
    image:
      'https://img3.labirint.ru/rc/11fb533af4437f568f975bba0323b88f/363x561q80/books92/915505/cover.jpg?1675675589',
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    genres: ['Science Fiction'],
    stock: true,
    bookType: 'Hardcover',
    published: 'October 12, 1979',
    pages: '215',
    image:
      'https://img3.labirint.ru/rc/905fd2d2ed9c98a2b16ef16bea5d3382/363x561q80/books87/863649/cover.jpg?1654424724',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genres: ['Fantasy'],
    stock: true,
    bookType: 'Hardcover',
    published: 'July 29, 1954',
    pages: '1178',
    image:
      'https://img4.labirint.ru/rc/bf240d7f64f125febb7f3b559029bbc1/363x561q80/books64/631252/cover.jpg?1617283512',
  },
  {
    title: 'Crime and Punishment',
    author: 'F. M. Doestoevsky',
    genres: ['Fiction'],
    stock: true,
    bookType: 'Hardcover',
    published: '1866',
    pages: '430',
    image:
      'https://img3.labirint.ru/rc/997e1f199cf008476147a8241cba0649/363x561q80/books92/914149/cover.jpg?1670563567',
  },
  {
    title: 'Anna Karenina',
    author: 'L. N. Tolstoy',
    genres: ['Fiction'],
    stock: true,
    bookType: 'Hardcover',
    published: '1878',
    pages: '864',
    image:
      'https://img4.labirint.ru/rc/43cd85cbd53945886653f354d9f1cba4/363x561q80/books48/475818/cover.jpg?1612675786',
  },
  {
    title: 'Flowers for Algernon',
    author: 'Daniel Keyes',
    genres: ['Science fiction'],
    stock: true,
    bookType: 'Hardcover',
    published: 'April 1959',
    pages: '311',
    image:
      'https://img4.labirint.ru/rc/c9d45c77de55f0095716000786c18a94/363x561q80/books33/324880/cover.png?1677345902',
  },
];

function Home() {
  return (
    <div className="container">
      <section>
        <SearchBar />
        <ul className={styles.cards} data-testid="cards">
          {booksData.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              author={item.author}
              genres={item.genres}
              stock={item.stock}
              bookType={item.bookType}
              image={item.image}
              published={item.published}
              pages={item.pages}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
