import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setCardState } from '../../redux/reducers/app/cardsSlice';
import { setModals } from '../../redux/reducers/app/modalsSlice';
import { selectCards, selectComments, selectUsers } from '../../redux/reducers/selectors';

const UserAvatar = styled.p<{ bgColor: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${props => props.bgColor};
  color: #fff;
  font-weight: 500;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
`;

const UserName = styled.div<{ bgColor: string }>`
  font-size: 9px;
  background-color: ${props => props.bgColor};
  color: #fff;
  font-weight: 300;
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
`;

type CardProps = {
  id: number;
};

const Card: React.FC<CardProps> = ({ id }) => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const comments = useSelector(selectComments);
  const users = useSelector(selectUsers);
  const currentCard = cards.filter((card) => card.cardId === id)[0];
  const userColor = users.filter((user) => user.userName === currentCard.author)[0].userColor;
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
      <UserAvatar bgColor={`#${userColor}`}>
          {currentCard.author.slice(0, 1).toLocaleUpperCase()}
        </UserAvatar>
      <button onClick={handleOpenCardModal} type="button">
        <div className="card-info">
          <p>{currentCard.title}</p>
          <div className="card-comments">
          <p className="card-comments-value">{commentCommentsNumber}</p>
        </div>
        <UserName bgColor={`#${userColor}`}>{currentCard.author}</UserName>
        </div>
      </button>
    </div>
  );
};

export default Card;
