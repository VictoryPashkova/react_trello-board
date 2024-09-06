import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Card = {
  cardId?: number;
  title?: string;
  state?: string;
  columnId?: number;
  countComment?: number;
  description?: string;
  author?: string;
  activeCardId?: number;
  cardState?: string;
  newTitle?: string;
  newDescription?: string;
  rmCardId?: number;
};

type Comment = {
  cardId?: number;
  commentId?: number;
  commentText?: string;
  author?: string;
};

type Columns = {
  columnId?: number;
  columnTitle?: string;
  newTitle?: string;
};

type Users = {
  userName?: string;
  userColor?: string;
  userId?: string;
};

type CardsState = {
  cards: Card[];
  comments: Comment[];
  columns: Columns[];
  users: Users[];
};

const initialState: CardsState = {
  cards: [],
  comments: [],
  columns: [
    { columnId: 1, columnTitle: 'To-do' },
    { columnId: 2, columnTitle: 'In progress' },
    { columnId: 3, columnTitle: 'Testing' },
    { columnId: 4, columnTitle: 'Done' },
  ],
  users: [],
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      const updatedCards = [...state.cards, action.payload];
      return { ...state, cards: updatedCards };
    },
    setCardState: (state, action: PayloadAction<Card>) => {
      const { activeCardId, cardState } = action.payload;
      const updatedCards = state.cards.map((card) => {
        if (Number(card.cardId) === activeCardId) {
          return { ...card, state: cardState };
        }
        return card;
      });
      return { ...state, cards: updatedCards };
    },
    changeCardTitle: (state, action: PayloadAction<Card>) => {
      const { newTitle, cardId } = action.payload;
      const updatedCards = state.cards.map((card) => {
        if (Number(card.cardId) === Number(cardId)) {
          return { ...card, title: newTitle };
        }
        return card;
      });
      return { ...state, cards: updatedCards };
    },
    addNewUser: (state, action: PayloadAction<Users>) => {
      const { userName, userColor, userId } = action.payload;
      const updatedUsers = [...state.users, { userName, userColor, userId }];
      return { ...state, users: updatedUsers };
    },
    changeCardDescription: (state, action: PayloadAction<Card>) => {
      const { newDescription, cardId } = action.payload;
      const updatedCards = state.cards.map((card) => {
        if (Number(card.cardId) === Number(cardId)) {
          return { ...card, description: newDescription };
        }
        return card;
      });
      return { ...state, cards: updatedCards };
    },
    removeCard: (state, action: PayloadAction<Card>) => {
      const { rmCardId } = action.payload;
      const updatedCards = state.cards.filter((card) => Number(card.cardId) !== rmCardId);
      const updatedComments = state.comments.filter(
        (comment) => Number(comment.cardId) !== rmCardId,
      );
      return { ...state, cards: updatedCards, comments: updatedComments };
    },
    changeColumnTitle: (state, action: PayloadAction<Columns>) => {
      const { newTitle, columnId } = action.payload;
      const updatedColumns = state.columns.map((column) => {
        if (column.columnId === columnId) {
          return { ...column, columnTitle: newTitle };
        }
        return column;
      });
      return { ...state, columns: updatedColumns };
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      const updatedComments = [...state.comments, action.payload];
      return { ...state, comments: updatedComments };
    },
    changeComment: (state, action: PayloadAction<Comment>) => {
      const { commentId, commentText } = action.payload;
      const updatedComments = state.comments.map((comment) => {
        if (Number(comment.commentId) === Number(commentId)) {
          return { ...comment, commentText };
        }
        return comment;
      });
      return { ...state, comments: updatedComments };
    },
    removeComment: (state, action: PayloadAction<Comment>) => {
      const { commentId } = action.payload;
      const updatedComments = state.comments.filter(
        (comment) => Number(comment.commentId) !== Number(commentId),
      );
      return { ...state, comments: updatedComments };
    },
    reorderCards(
      state,
      action: PayloadAction<{ columnId: number; reorderedCards: Card[] }>
    ) {
      const { columnId, reorderedCards } = action.payload;

      // Фильтруем карточки, которые принадлежат нужной колонке
      state.cards = state.cards.filter(card => card.columnId !== columnId);

      // Добавляем обновленные карточки в нужную колонку
      state.cards = [...state.cards, ...reorderedCards];
    },
  },
});

export const {
  addCard,
  setCardState,
  changeCardTitle,
  changeCardDescription,
  removeCard,
  changeColumnTitle,
  addComment,
  changeComment,
  removeComment,
  reorderCards,
  addNewUser,
} = cardSlice.actions;

export default cardSlice.reducer;
