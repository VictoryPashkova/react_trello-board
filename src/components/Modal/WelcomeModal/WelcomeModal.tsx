import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqueId from 'lodash.uniqueid';

import { setModals } from '../../../redux/reducers/app/modalsSlice';
import { selectModals } from '../../../redux/reducers/selectors';
import { setUser } from '../../../redux/reducers/user/authSlice';
import Form from '../../Form/Form';
import { addNewUser } from '../../../redux/reducers/app/cardsSlice';

const WelcomeModal: React.FC = () => {
  const dispatch = useDispatch();
  const welcomeModalState = useSelector(selectModals).welcomeModal;

  const handleSubmit = (formData: { userName: string }) => {
    const userColor: string = Math.floor(Math.random() * 16777215).toString(16);
    dispatch(setModals({ welcomeModal: false, mainModal: false }));
    dispatch(setUser({ userName: formData.userName }));
    dispatch(addNewUser({ userName: formData.userName, userColor,  userId: uniqueId() }));
  };

  const handleCancel = () => {
    dispatch(setUser({ userName: '' }));
  };

  return (
    <div
      className={`modal-content min-height min-width ${welcomeModalState === true ? '' : 'disabled'}`}
    >
      <div className="modal-welcome-container">
        <h2>Welcome to Trello Board!</h2>
        <Form
          onSubmit={handleSubmit}
          placeholder="Enter your name"
          name="userName"
          style="userName"
          type="text"
          isDisabled={false}
          handleCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default WelcomeModal;
