import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../uikit/Button/Button';

type FormData = {
  inputNewCard: string;
  title: string;
  description: string;
  comment: string;
  userName: string;
};

type InputFormProps = {
  onSubmit: SubmitHandler<FormData>;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel?: () => void;
  placeholder: string;
  style?: string;
  type?: string;
  name: keyof FormData;
  isDisabled?: boolean;
  defaultValue?: string;
};

const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  handleCancel,
  placeholder,
  style,
  type = 'text',
  name,
  isDisabled,
  defaultValue,
}) => {
  const formClassName = `primary-form ${style} ${isDisabled ? 'disabled' : ''}`;
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
      <input
        className="modal-input"
        {...register(name)}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      <div className="form-control">
        <Button styleBtn="form-control-btn" type="submit" text="Save" />
        <Button
          styleBtn="form-control-btn"
          type="button"
          text="Cancel"
          handleClick={handleCancel}
        />
      </div>
    </form>
  );
};

export default InputForm;
