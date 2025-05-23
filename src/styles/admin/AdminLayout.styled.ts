import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  color: #000000;
  background-color: #f2f9f8;
  display: flex;
`;

export const Container = styled.div`
  width: 100%;
  /* max-width: 1400px; */
  min-width: 1200px;
  padding: 20px 30px 30px 30px;
  /* margin: 20px 30px 0 30px; */
  /* padding-bottom: 30px; */
  box-sizing: border-box;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #f2f2f2;
  height: 100vh;
  /* width: calc(100vw - 250px); */
  overflow-y: auto;
`;
