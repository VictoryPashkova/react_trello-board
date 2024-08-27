import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setCardState } from '../../redux/reducers/app/cardsSlice';
import { setModals } from '../../redux/reducers/app/modalsSlice';
import { selectCards, selectComments, selectUsers } from '../../redux/reducers/selectors';

const UserAvatar = styled.p<{ $bgcolor: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${props => props.$bgcolor};
  color: #fff;
  font-weight: 500;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
`;

const UserName = styled.div<{ $bgcolor: string }>`
  font-size: 9px;
  background-color: ${props => props.$bgcolor};
  color: #fff;
  font-weight: 300;
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
`;

const CardStyles = styled.div`
  height: auto;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid transparent;
  &:hover {
    border-color: blue;
    transition: border 0.7s ease-in-out;
  }
`;

const CardComments = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const CardCommentsValue = styled.p`
  font-size: small;
  padding: 0;
  margin: 0;
  font-weight: 300;

  &::before {
    content: '💬  ';
  }
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
  const userColor = users.filter((user) => user.userName === currentCard.author)[0].userColor ?? '000000';
  const commentCommentsNumber = comments.filter(
    (comment) => comment.cardId === currentCard.cardId,
  ).length;
  const author = currentCard?.author ?? 'Unknown';

  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpenCardModal = () => {
    if (cardRef.current) {
      const activeCardId = Number(cardRef.current.id);

      dispatch(setCardState({ activeCardId, cardState: 'active' }));
      dispatch(setModals({ mainModal: true, cardModal: true }));
    }
  };


  return (
    <CardStyles id={id.toString()} ref={cardRef}>
      <UserAvatar $bgcolor={`#${userColor?.toString()}`}>
        {author.slice(0, 1).toLocaleUpperCase()}
      </UserAvatar>
      <button onClick={handleOpenCardModal} type="button">
        <div>
          <p>{currentCard.title}</p>
          <CardComments>
            <CardCommentsValue>{commentCommentsNumber}</CardCommentsValue>
          </CardComments>
          <UserName $bgcolor={`#${userColor?.toString()}`}>{currentCard.author}</UserName>
        </div>
      </button>
    </CardStyles>
  );
};

export default Card;
