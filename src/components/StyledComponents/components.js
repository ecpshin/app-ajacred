import styled from 'styled-components';

const BtnBase = styled.button`
  min-width: 150px;
  padding: 8px;
  text-align: center;
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;

  border: 1px solid #c3c3c3;
  border-radius: 4px;
`;
const Input = styled.input`
  all: unset;
  margin: 0;
  padding: 2px 8px;
  width: 100%;
  min-height: 38px;
  display: flex;
  flex-direction: row;
  outline: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
  box-sizing: border-box;
  font-size: 1.4rem !important;
`;

export const BtnCustom = styled(BtnBase)`
  background-color: #ff6600;
  color: #f7f7f7;
  &: hover {
    background-color: #ffa305;
  }
`;

export const BtnPrimary = styled(BtnBase)`
  background-color: #001dff;
  color: #f7f7f7;
  &: hover {
    background-color: #96b9ff;
  }
`;

export const BtnCancel = styled(BtnBase)`
  background-color: #bcbcbc;
  color: #000;
  &:hover {
    background-color: #dddddd;
  }
`;

export const BtnDelete = styled(BtnBase)`
  color: #f7f7f7;
  background-color: #ff0000;
  &:hover {
    background-color: #ff8989;
  }
`;

export const BtnSuccess = styled(BtnBase)`
  color: #fff;
  background-color: #0fad06;
  &:hover {
    background-color: #74ce37;
  }
`;

export const BtnPremium = styled(BtnBase)`
  color: #fff;
  background-color: #005991;
  &:hover {
    background-color: #2d90ce;
  }
`;

export const MyInput = styled(Input)`
  color: #777;
  font-size: 1.6rem;
  &:focus {
    outline: 1px solid #fa2700;
  }
`;

export const LabelBase = styled.label`
  width: 100%;
  margin-left: 5px;
  font-weight: 700;
`;

export const LabelCustom = styled(LabelBase)`
  font-size: 1.2rem;
  color: #f67000;
`;

export const SelectCustom = styled.select`
  width: 92%;
  border: none;
  border-bottom: 1px solid #f67000;
  border-radius: 5px;
  font-size: 1.2rem !important;
`;

export const OptionCustom = styled.option`
  background-color: #fffaed;
  font-size: 1.4rem;
  font-weight: 600;
  color: #f67000;
`;

export const TextAreaCustom = styled.textarea`
  width: 100%;
  color: black;
  background-color: yellow;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    border: 1px solid #f26000;
  }
  &:active {
    border: none;
  }
`;
