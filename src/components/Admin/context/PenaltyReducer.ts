export interface Penalty {
  reason: string;
  penalty: string;
  penaltyDate: string;
}

export interface PenaltyState {
  [userId: number]: Penalty[];
}

export interface PenaltyAction {
  type: 'SET_PENALTY' | 'ADD_PENALTY' | 'EDIT_PENALTY' | 'DELETE_PENALTY';
  userId: number;
  payload?: Penalty | PenaltyState;
  index?: number;
}

export const penaltyReducer = (
  state: PenaltyState,
  action: PenaltyAction,
): PenaltyState => {
  switch (action.type) {
    case 'SET_PENALTY':
      return {
        ...(action.payload as PenaltyState),
      };

    case 'ADD_PENALTY':
      return {
        ...state,
        [action.userId]: [
          ...(state[action.userId] || []),
          action.payload as Penalty,
        ],
      };

    case 'EDIT_PENALTY':
      return {
        ...state,
        [action.userId]: state[action.userId].map((item, idx) =>
          idx === action.index ? (action.payload as Penalty) : item,
        ),
      };

    case 'DELETE_PENALTY':
      return {
        ...state,
        [action.userId]: state[action.userId].filter(
          (_, idx) => idx !== action.index,
        ),
      };

    default:
      return state;
  }
};
