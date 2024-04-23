import './App.scss';

import Board from './components/Board/Board';
import Modal from './components/Modal/Modal';
import WelcomeModal from './components/Modal/WelcomeModal/WelcomeModal';

const App = () => {
  return (
    <>
      <header>
        <h1>Trello Board</h1>
      </header>
      <main>
        <Board />
      </main>
      <Modal>
        <WelcomeModal />
      </Modal>
    </>
  );
};

export default App;
