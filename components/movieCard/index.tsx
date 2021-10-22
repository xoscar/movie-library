import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Movie from '../../models/Movie';
import styles from './movieCard.module.css';

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: FunctionComponent<MovieCardProps> = ({ movie: { poster_path, title, id } }) => {
  return (
    <Link href={`/movies/${id}`} passHref>
      <div className={styles.container}>
        <Image src={poster_path} alt={title} layout="fill" />
      </div>
    </Link>
  );
};

export default MovieCard;
