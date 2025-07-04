import styled from "styled-components";

export const SignupContainer = styled.div`
  padding: 3em 5em;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background: #fafaf8;
  color: #000;
  & .input_box {
    width: 100%;
  }
  & input {
    width: 100%;
    min-width: 350px;
    background: none;
    border: 1px solid #363636;
    border-radius: 5px;
    padding: 1em;
    font-size: 0.9em;
  }
  & label {
    display: block;
    margin-bottom: 0.5em;
    font-weight: bold;
  }
  & form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1em;
  }
  & form > div {
    width: 100%;
  }
`;

export const TermsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
  flex-direction: column;
  & label {
    width: 100%;
    display: flex;
  }
  & button {
    width: 100%;
    display: flex;
    background: none;
    padding: 1em;
    border: 1px solid #363636;
    border-radius: 5px;
  }
  & label > input {
    margin-left: 1em;
    width: 20px;
    min-width: 0;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5em 1em;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  letter-spacing: 10px;
  font-size: 1.2em;
  &:hover {
    background-color: #555;
  }
`;
