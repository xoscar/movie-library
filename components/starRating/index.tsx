import { FunctionComponent, useCallback, useState } from 'react';
import styles from './starRating.module.css';

const selectedIcon = '★';
const deselectedIcon = '☆';
const starsList = Array.from({ length: 5 }, (_, index) => index + 1);

type StarRatingProps = {
  onRating(rating: number): void;
};

const StarRating: FunctionComponent<StarRatingProps> = ({ onRating }) => {
  const [rating, setRating] = useState(0);

  const handleOnChange = useCallback(
    (star) => {
      const newRating = star === rating ? 0 : star;

      setRating(newRating);
      onRating(newRating);
    },
    [rating],
  );

  return (
    <div className={styles.container}>
      {starsList.map((star) => (
        <span key={star} onClick={() => handleOnChange(star)} className={styles.star}>
          {rating < star ? deselectedIcon : selectedIcon}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
