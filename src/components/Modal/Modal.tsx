import React from 'react';
import { useSelector } from 'react-redux';

import { selectCards, selectModals } from '../../redux/reducers/selectors';
import CardModal from './CardModal.tsx/CardModal';

type ModalProps = {
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  const mainModalState = useSelector(selectModals).mainModal;
  const cards = useSelector(selectCards);
  const activeModalCard = cards.filter((card) => card.state === 'active');

  return (
    <div className={`modal ${mainModalState === false ? 'disabled' : ''}`} aria-hidden="true">
      {activeModalCard.map((card) => {
        if (card.cardId) {
          return <CardModal key={card.cardId} id={card.cardId} />;
        }
      })}
      {children}
    </div>
  );
};

export default Modal;
