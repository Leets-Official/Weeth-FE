export interface Penalty {
  reason: string;
  penalty: string;
  penaltyDate: string;
}

export interface PenaltyState {
  [studentId: string]: Penalty[];
}

export interface PenaltyAction {
  type: 'ADD_PENALTY' | 'EDIT_PENALTY' | 'DELETE_PENALTY';
  studentId: string;
  payload?: Penalty;
  index?: number;
}

export const penaltyReducer = (
  state: PenaltyState,
  action: PenaltyAction,
): PenaltyState => {
  switch (action.type) {
    case 'ADD_PENALTY':
      return {
        ...state,
        [action.studentId]: [
          ...(state[action.studentId] || []),
          action.payload!,
        ],
      };
    case 'EDIT_PENALTY':
      return {
        ...state,
        [action.studentId]: state[action.studentId].map((item, idx) =>
          idx === action.index ? action.payload! : item,
        ),
      };
    case 'DELETE_PENALTY':
      return {
        ...state,
        [action.studentId]: state[action.studentId].filter(
          (_, idx) => idx !== action.index,
        ),
      };
    default:
      return state;
  }
};
