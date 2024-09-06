import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqueId from 'lodash.uniqueid';
import Button from '../../../uikit/Button/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';


import { setModals } from '../../../redux/reducers/app/modalsSlice';
import { selectModals } from '../../../redux/reducers/selectors';
import { setUser } from '../../../redux/reducers/user/authSlice';
import { addNewUser } from '../../../redux/reducers/app/cardsSlice';

type FormData = {
  userName: string;
};

const bgColor = 'white';
const errorColor = 'red';

const ModalContentStyles = styled.div<{ hidden: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${bgColor};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 50%;
  height: auto;
  overflow: scroll;

  ${({ hidden }) => hidden && `
    display: none;
  `}
`;

const ModalWelcomeContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const ErrorMessageStyles = styled.p`
  color: ${errorColor};
  font-size: 9px;
`;

const FormControlStyles = styled.p`
  display: flex;
  gap: 10px;
`;

const WelcomeModal: React.FC = () => {
  const dispatch = useDispatch();
  const welcomeModalState = useSelector(selectModals).welcomeModal;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const userColor: string = Math.floor(Math.random() * 16777215).toString(16);
    console.log(userColor);
    dispatch(setModals({ welcomeModal: false, mainModal: false }));
    dispatch(setUser({ userName: formData.userName }));
    dispatch(addNewUser({ userName: formData.userName, userColor, userId: uniqueId('user_') }));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  
  return (
    <ModalContentStyles hidden={!welcomeModalState}>
      <ModalWelcomeContainerStyles>
        <h2>Welcome to Trello Board!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        {errors.userName && <ErrorMessageStyles>{errors.userName.message}</ErrorMessageStyles>}
          <input
            className="modal-input"
            {...register('userName', { required: 'Name is required' })}
            type="text"
            placeholder="Enter your name"
            style={{ borderColor: errors.userName ? errorColor : 'initial' }}
            ref={inputRef}
          />
          <FormControlStyles>
            <Button styleBtn="form-control-btn" type="submit" text="Save" />
          </FormControlStyles>
        </form>
      </ModalWelcomeContainerStyles>
    </ModalContentStyles>
  );
};

export default WelcomeModal;
