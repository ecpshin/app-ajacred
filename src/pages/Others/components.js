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

const WrapperRow = styled(Wrapper)`
  height: 90%;
  padding: 0;
  flex-direction: row;
  justify-content: space-evenly;
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

const PanelCustom = styled.div`
  width: 75%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
  border: #d8d8d893 1px solid;
  border-radius: 20px;
`;

const PanelBodyCustom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PanelHeaderCustom = styled(PanelBodyCustom)`
  padding: 25px 0 15px 25px;
  font-family: 'Ubuntu', sans-serif;
  border-bottom: 3px solid #f27000;
  background-color: #f7f7f7;
  margin-bottom: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;
const TitleCustom = styled.h2`
  font-size: 2.8rem;
  color: hsl(12, 100%, 50%);
  font-weight: 500;
`;
const SubtitlelCustom = styled.p`
  font-size: 1.4rem !important;
  color: hsl(0, 0%, 73%);
  font-weight: 400;
`;

const FormPanel = styled.form`
  width: 100%;
  height: 300px;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export {
  BtnPremium,
  FormPanel,
  InputCustom,
  PanelBodyCustom,
  PanelCustom,
  PanelHeaderCustom,
  SubtitlelCustom,
  TitleCustom,
  Wrapper,
  WrapperRow,
  Row,
};
