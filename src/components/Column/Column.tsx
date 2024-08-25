import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { addCard, changeColumnTitle } from '../../redux/reducers/app/cardsSlice';
import { selectCards, selectComments, selectUser } from '../../redux/reducers/selectors';
import Button from '../../uikit/Button/Button';
import Card from '../Card/Card';
import Form from '../Form/Form';
import { getUniqueId } from '../../utils/index';

const ColumnContainer = styled.div`
  width: 30%;
  height: 100%;
  min-height: 250px;
  background-color: #e1e8f0;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  overflow: scroll;
`;

const ColumnAddCardBtn = styled.div`
  padding: 10px;

  &:hover {
    background-color: $main-text-color;
    border-radius: 10px;
    color: $main-bg-color;
    transition: background-color 0.7s ease-in-out;
  }
`;

const ColumnTitleText = styled.div`
  font-size: 16px;
  font-weight: 700;

  &:hover {
    font-size: 18px;
  transition: font-size 0.7s ease-in-out;
  }
`;

type ColumnProps = {
  columnTitle: string;
  columnId: number;
};

const Column: React.FC<ColumnProps> = ({ columnTitle, columnId }) => {
  localStorage.clear();
  sessionStorage.clear();
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const comments = useSelector(selectComments);
  const userName = useSelector(selectUser);
  const currentColumnCards = cards.filter((card) => card.columnId === columnId);

  const [addNewCardFormDisabled, setAddNewCardFormDisabled] = useState(true);
  const [titleFormDisabled, setTitleFormDisabled] = useState(true);

  const handleSubmitNewCard = (formData: { inputNewCard: string }) => {
    const cardId = getUniqueId();
    const numberComments = comments.filter((comment) => comment.cardId === cardId).length;
    dispatch(
      addCard({
        columnId,
        title: formData.inputNewCard,
        cardId,
        countComment: numberComments,
        state: 'disabled',
        description: '',
        author: userName || '',
      }),
    );
    setAddNewCardFormDisabled(true);
  };

  const handleSubmitChangeTitle = (formData: { title: string }) => {
    dispatch(changeColumnTitle({ newTitle: formData.title, columnId }));
    setTitleFormDisabled(true);
  };

  return (
    <ColumnContainer>
      <Form
        onSubmit={handleSubmitChangeTitle}
        handleCancel={() => setTitleFormDisabled(true)}
        type="text"
        placeholder="Enter title"
        name="title"
        isDisabled={titleFormDisabled}
      />
      <Button
        isDisabled={!titleFormDisabled}
        text={columnTitle}
        styleBtn="column-title-btn"
        styleBtnText="column-title-text"
        type="button"
        handleClick={() => setTitleFormDisabled(false)}
      />
      {currentColumnCards.map(({ cardId }) => (
        <Card key={cardId} id={cardId} />
      ))}
      <Form
        onSubmit={handleSubmitNewCard}
        handleCancel={() => setAddNewCardFormDisabled(true)}
        type="text"
        placeholder="New card..."
        name="inputNewCard"
        isDisabled={addNewCardFormDisabled}
      />
      <Button
        handleClick={() => setAddNewCardFormDisabled(false)}
        type="button"
        styleBtn="column-add-card-btn"
        styleBtnText="column-add-card-text"
        text="+ Add card"
      />
    </ColumnContainer>
  );
};

export default Column;
