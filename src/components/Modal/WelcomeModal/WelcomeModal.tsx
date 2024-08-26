import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqueId from 'lodash.uniqueid';
import Button from '../../../uikit/Button/Button';
import { useForm, SubmitHandler } from 'react-hook-form';

import { setModals } from '../../../redux/reducers/app/modalsSlice';
import { selectModals } from '../../../redux/reducers/selectors';
import { setUser } from '../../../redux/reducers/user/authSlice';
import { addNewUser } from '../../../redux/reducers/app/cardsSlice';

type FormData = {
  userName: string;
};

const WelcomeModal: React.FC = () => {
  const dispatch = useDispatch();
  const welcomeModalState = useSelector(selectModals).welcomeModal;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const userColor: string = Math.floor(Math.random() * 16777215).toString(16);
    dispatch(setModals({ welcomeModal: false, mainModal: false }));
    dispatch(setUser({ userName: formData.userName }));
    dispatch(addNewUser({ userName: formData.userName, userColor, userId: uniqueId('user_') }));
  };

  return (
    <div
      className={`modal-content min-height ${welcomeModalState === true ? '' : 'disabled'}`}
    >
      <div className="modal-welcome-container">
        <h2>Welcome to Trello Board!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        {errors.userName && <p className="error-message">{errors.userName.message}</p>}
          <input
            className="modal-input"
            {...register('userName', { required: 'Name is required' })}
            type="text"
            placeholder="Enter your name"
            style={{ borderColor: errors.userName ? 'red' : 'initial' }}
          />
          <div className="form-control">
            <Button styleBtn="form-control-btn" type="submit" text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomeModal;
