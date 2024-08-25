import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { addCard, changeColumnTitle } from '../../redux/reducers/app/cardsSlice';
import { selectCards, selectComments, selectUser } from '../../redux/reducers/selectors';
import Button from '../../uikit/Button/Button';
import Card from '../Card/Card';
import Form from '../Form/Form';
import { getUniqueId } from '../../utils/index';

const ColumnContainerStyles = styled.div`
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

const ColumnAddCardBtnStyles = styled.div`
  padding: 10px;

  &:hover {
    background-color: #374452;
    border-radius: 10px;
    color: #f9fafc;
    transition: background-color 0.7s ease-in-out;
  }
`;

const ColumnTitleTextStyles = styled.div`
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
    if (!formData.title) {
      setTitleFormDisabled(true);
      return;
    }
    dispatch(changeColumnTitle({ newTitle: formData.title, columnId }));
    setTitleFormDisabled(true);
  };

  return (
    <ColumnContainerStyles>
      <Form
        onSubmit={handleSubmitChangeTitle}
        handleCancel={() => setTitleFormDisabled(true)}
        type="text"
        placeholder="Enter title"
        name="title"
        isDisabled={titleFormDisabled}
      />
      <ColumnTitleTextStyles>
        <Button
          isDisabled={!titleFormDisabled}
          text={columnTitle}
          type="button"
          handleClick={() => setTitleFormDisabled(false)}
        />
      </ColumnTitleTextStyles>
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

      <ColumnAddCardBtnStyles>
        <Button
          handleClick={() => setAddNewCardFormDisabled(false)}
          type="button"
          text="+ Add card"
        />
      </ColumnAddCardBtnStyles>
    </ColumnContainerStyles>
  );
};

export default Column;
