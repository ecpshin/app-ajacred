import styled from 'styled-components';

const BtnBase = styled.button`
  min-width: 120px;
  padding: 8px;
  text-align: center;
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.28rem;
  font-weight: 700;

  border: 1px solid #c3c3c3;
  border-radius: 4px;
`;

const BtnPremium = styled(BtnBase)`
  color: #fff;
  background-color: #005991;
  &:hover {
    background-color: #2d90ce;
  }
`;

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  width: 100%;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const InputCustom = styled.input`
  width: 100%;
`;

export { InputCustom, BtnPremium, Wrapper, Row };
