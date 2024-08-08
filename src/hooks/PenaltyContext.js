import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PenaltyContext = createContext();

export const PenaltyProvider = ({ children }) => {
  const [penaltyData, setPenaltyData] = useState(null);
  const [penaltyFetchError, setPenaltyFetchError] = useState(null);
  const [hasPenalty, setHasPenalty] = useState(false);
  const [myPenaltyCount, setMyPenalty] = useState(0);

  return (
    <PenaltyContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        myPenaltyCount,
        setMyPenalty,
        penaltyData,
        setPenaltyData,
        penaltyFetchError,
        setPenaltyFetchError,
        hasPenalty,
        setHasPenalty,
      }}
    >
      {children}
    </PenaltyContext.Provider>
  );
};

PenaltyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
