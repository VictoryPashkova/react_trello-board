import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeComment, removeComment } from '../../redux/reducers/app/cardsSlice';
import Button from '../../uikit/Button/Button';
import Form from '../Form/Form';

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

  const handleRmComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLElement;
    const closestComment = targetElement.closest('.comment-item');
    if (closestComment) {
      const commentId = Number(closestComment.id);
      dispatch(removeComment({ commentId }));
    }
  };

  return (
    <div className="comment-item" id={id.toString()}>
      <div className="user-name-text">{userName}</div>
      <div
        className={`user-comment-item ${commentControlItemsState.commentBtnActive ? '' : 'disabled'}`}
      >
        <span>{commentText}</span>
      </div>
      <div className="comment-control">
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
      </div>
      <Form
        type="text"
        placeholder="Change comment"
        name="comment"
        isDisabled={!commentControlItemsState.commentFormActive}
        onSubmit={handleSubmitChangeComment}
        handleCancel={() => setFormState(false, true)}
        defaultValue={commentValue}
      />
    </div>
  );
};

export default Comment;
