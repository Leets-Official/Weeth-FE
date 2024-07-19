import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: none;
  height: 39px;
  width: 17%;
  color: white;
  cursor: pointer;
  font-weight: 600; //semi-bold
`;

const Category = () => {
  return (
    <div>
      <Button>전체</Button>
      <Button>1기</Button>
      <Button>2기</Button>
      <Button>3기</Button>
    </div>
  );
};

export default Category;
