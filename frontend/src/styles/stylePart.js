import styled from 'styled-components'

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end ;
`;
const AddContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddLabel = styled.label`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 600;
`;

const AddInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: max(500px, 50vh);
  height: 90px;
`;

const AddInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #9191ff;
  }
`;

const FlexDiv = styled.div`
display: flex;
`
const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #878d8d;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #5f5fd4;
  }
`;

export {Center,AddContainer,AddLabel,AddInput,AddInputDiv,FlexDiv,StyledButton}