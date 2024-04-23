import uniqueId from 'lodash.uniqueid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addComment,
  changeCardDescription,
  changeCardTitle,
  removeCard,
  setCardState,
} from '../../../redux/reducers/app/cardsSlice';
import { setModals } from '../../../redux/reducers/app/modalsSlice';
import {
  selectCards,
  selectColumns,
  selectComments,
  selectModals,
  selectUser,
} from '../../../redux/reducers/selectors';
import Button from '../../../uikit/Button/Button';
import Comment from '../../Comment/Comment';
import Form from '../../Form/Form';

type CardModalProps = {
  id: number;
};

const CardModal: React.FC<CardModalProps> = ({ id }) => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const comments = useSelector(selectComments);
  const columns = useSelector(selectColumns);
  const modalsState = useSelector(selectModals);
  const userName = useSelector(selectUser);
  const currentCard = cards.filter((card) => id === card.cardId)[0];
  const [titleControlItemsState, setTitleItemsState] = useState({
    titleFormActive: false,
    titleBtnActive: true,
  });

  const [descriptionControlItemsState, setDescriptionItemsState] = useState({
    descriptionFormActive: false,
    descriptionBtnActive: true,
  });

  const setControlTitleState = (isFormActive: boolean, isBtnActive: boolean) => {
    setTitleItemsState({ titleFormActive: isFormActive, titleBtnActive: isBtnActive });
  };

  const setDescriptionControlState = (isFormActive: boolean, isBtnActive: boolean) => {
    setDescriptionItemsState({
      descriptionFormActive: isFormActive,
      descriptionBtnActive: isBtnActive,
    });
  };

  const handleDeleteCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLElement;
    const closestCard = targetElement.closest('.modal-card-container');
    if (closestCard) {
      const rmCardId = Number(closestCard.id);
      dispatch(removeCard({ rmCardId }));
      dispatch(setModals({ cardModal: false, mainModal: false }));
    }
  };

  const handleSubmitAddComment = (formData: { comment: string }) => {
    const newComment = {
      commentId: uniqueId(),
      commentText: formData.comment,
      cardId: id,
      author: userName,
    };
    dispatch(addComment(newComment));
  };

  const handleCloseCard = () => {
    dispatch(setCardState({ activeCardId: Number(currentCard.cardId), cardState: 'disabled' }));
    dispatch(setModals({ cardModal: false, mainModal: false }));
  };

  const handleSubmitAddNewTitle = (formData: { title: string }) => {
    dispatch(changeCardTitle({ newTitle: formData.title, cardId: id }));
    setControlTitleState(false, true);
  };

  const handleSubmitAddNewDescription = (formData: { description: string }) => {
    dispatch(changeCardDescription({ newDescription: formData.description, cardId: id }));
    setDescriptionControlState(false, true);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(setCardState({ activeCardId: Number(currentCard.cardId), cardState: 'disabled' }));
        dispatch(setModals({ cardModal: false, mainModal: false }));
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className={`modal-content ${modalsState.cardModal === false ? 'disabled' : ''}`}>
      <div className="modal-card-container" id={id}>
        <Button
          text="close"
          styleBtnText="close"
          styleBtn="card-control-btn-delete"
          handleClick={handleCloseCard}
        />
        <div className="modal-card-content-container">
          <p className="p-text">
            Column:{' '}
            {columns.filter((column) => column.columnId === currentCard.columnId)[0].columnTitle} |
            Author: {currentCard.author}
          </p>
          <Form
            type="text"
            placeholder="Enter title"
            name="title"
            isDisabled={!titleControlItemsState.titleFormActive}
            onSubmit={handleSubmitAddNewTitle}
            handleCancel={() => setControlTitleState(false, true)}
          />
          <Button
            type="button"
            text={currentCard.title}
            styleBtnText="cardTitle"
            isDisabled={!titleControlItemsState.titleBtnActive}
            handleClick={() => setControlTitleState(true, false)}
          />
          <Button
            type="button"
            text="Card description"
            styleBtnText="cardTitle"
            handleClick={() => setDescriptionControlState(true, false)}
          />
          <Button
            text={currentCard.description}
            styleBtn="description-div"
            isDisabled={descriptionControlItemsState.descriptionFormActive}
            handleClick={() => setDescriptionControlState(true, false)}
            type="button"
          />
          <Form
            type="text"
            placeholder="Add description"
            name="description"
            isDisabled={!descriptionControlItemsState.descriptionFormActive}
            onSubmit={handleSubmitAddNewDescription}
            handleCancel={() => setDescriptionControlState(false, true)}
          />
          <div className="card-text-description">
            <span className="text-description" />
          </div>
        </div>
        <Button
          handleClick={handleDeleteCard}
          text="Delete this Card"
          styleBtn="card-control-btn"
          styleBtnText="delete-btn-text"
          type="button"
        />
        <div className="modal-card-comments">
          <div className="modal-card-comments-container">
            <span className="cardTitle">Actions</span>
            <div className="card-comments">
              <Form
                type="text"
                placeholder="Add some comment..."
                name="comment"
                onSubmit={handleSubmitAddComment}
              />
            </div>
            {comments
              .filter(({ cardId }) => cardId === id)
              .map(({ commentId, commentText, author }) => {
                if (commentId && commentText && author) {
                  return (
                    <Comment
                      key={commentId}
                      commentText={commentText}
                      userName={author}
                      id={commentId}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
