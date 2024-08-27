import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { changeComment, removeComment } from '../../redux/reducers/app/cardsSlice';
import Button from '../../uikit/Button/Button';
import Form from '../Form/Form';

type UserCommentItemProps = {
  isdisabled: boolean;
};

const CommentItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`;

const UserNameStyles = styled.div`
  font-weight: 700;
`;

const UserCommentItemStyles = styled.div<UserCommentItemProps>`
  background-color: #e1e8f0;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #f5f5f5;
  width: 100%;
  height: auto;
  overflow: hidden;
  font-weight: 300;
  font-size: 80%;
  
  &.disabled {
    background-color: #e0e0e0;
    color: #888;
  }
`;

const CommentControlStyles = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
`;

type CommentProps = {
  userName: string;
  commentText: string;
  id: number;
};

type FormStateTypes = {
  commentFormActive: boolean;
  commentBtnActive: boolean;
};

const Comment: React.FC<CommentProps> = ({ userName, commentText, id }) => {
  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState(commentText);
  const [commentControlItemsState, setCommentItemsState] = useState<FormStateTypes>({
    commentFormActive: false,
    commentBtnActive: true,
  });

  const setFormState = (form: boolean, btn: boolean) =>
    setCommentItemsState({ commentFormActive: form, commentBtnActive: btn });

  const handleSubmitChangeComment = (formData: { comment: string }) => {
    dispatch(changeComment({ commentId: id, commentText: formData.comment }));
    setFormState(false, true);
    setCommentValue('');
  };

  const commentRef = useRef<HTMLDivElement>(null);

  const handleRmComment = () => {
    let commentId;
    if (commentRef.current) {
      commentId = Number(commentRef.current.id);
    }
    if (commentId) {
      dispatch(removeComment({ commentId }));
    }
  };

  return (
    <CommentItemStyles id={id.toString()} ref={commentRef}>
      <UserNameStyles>{userName}</UserNameStyles>
      <UserCommentItemStyles isdisabled={commentControlItemsState.commentFormActive}><span>{commentText}</span></UserCommentItemStyles>
      <CommentControlStyles>
        <Button
          text="Изменить"
          isDisabled={commentControlItemsState.commentFormActive}
          handleClick={() => setFormState(true, false)}
          type="button"
        />
        <Button
          text="Удалить"
          isDisabled={!commentControlItemsState.commentBtnActive}
          handleClick={handleRmComment}
          type="button"
        />
      </CommentControlStyles>
      <Form
        type="text"
        placeholder="Change comment"
        name="comment"
        isDisabled={!commentControlItemsState.commentFormActive}
        onSubmit={handleSubmitChangeComment}
        handleCancel={() => setFormState(false, true)}
        defaultValue={commentValue}
      />
    </CommentItemStyles>
  );
};

export default Comment;
