import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCardState } from '../../redux/reducers/app/cardsSlice';
import { setModals } from '../../redux/reducers/app/modalsSlice';
import { selectCards, selectComments } from '../../redux/reducers/selectors';

type CardProps = {
  id: number;
};

const Card: React.FC<CardProps> = ({ id }) => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const comments = useSelector(selectComments);
  const currentCard = cards.filter((card) => card.cardId === id)[0];
  const commentCommentsNumber = comments.filter(
    (comment) => comment.cardId === currentCard.cardId,
  ).length;

  const handleOpenCardModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLElement;
    const closestCard = targetElement.closest('.card');
    if (closestCard) {
      const activeCardId = Number(closestCard.id);
      dispatch(setCardState({ activeCardId, cardState: 'active' }));
      dispatch(setModals({ mainModal: true, cardModal: true }));
    }
  };

  return (
    <div className="card" id={id}>
      <button onClick={handleOpenCardModal} type="button">
        <p className="p-text">Author: {currentCard.author}</p>
        <p>{currentCard.title}</p>
        <div className="card-comments">
          <p className="card-comments-value">{commentCommentsNumber}</p>
        </div>
      </button>
    </div>
  );
};

export default Card;
