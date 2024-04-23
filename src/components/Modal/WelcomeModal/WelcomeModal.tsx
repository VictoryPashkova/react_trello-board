import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setModals } from '../../../redux/reducers/app/modalsSlice';
import { selectModals } from '../../../redux/reducers/selectors';
import { setUser } from '../../../redux/reducers/user/authSlice';
import Form from '../../Form/Form';

const WelcomeModal: React.FC = () => {
  const dispatch = useDispatch();
  const welcomeModalState = useSelector(selectModals).welcomeModal;

  const handleSubmit = (formData: { userName: string }) => {
    dispatch(setModals({ welcomeModal: false, mainModal: false }));
    dispatch(setUser(formData.userName));
  };

  const handleCancel = () => {
    dispatch(setUser(''));
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
