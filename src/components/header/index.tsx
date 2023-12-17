import styled from "styled-components";

export default function Header() {
  return (
    <>
      <HeaderSection>
        <HeaderUL>
          <Cartrgory>데이터 정렬</Cartrgory>
          <Cartrgory>데이터 종류</Cartrgory>
        </HeaderUL>
      </HeaderSection>
      {/* <HeaderText> STC front-end 과제 이정운</HeaderText> */}
    </>
  );
}

const HeaderSection = styled.div`
  background-color: Orange;
  padding: 0.1rem;
  /* border: 3px solid red; */
`;
const HeaderText = styled.div`
  display: block;
  margin: 1rem;
  font-weight: 600;
  font-size: 1rem;
  /* border: 3px solid red; */
`;

const HeaderUL = styled.div`
  display: flex;
  margin: 1rem;
  /* border: 3px solid red; */
`;

const Cartrgory = styled.div`
  font-weight: 600;
  margin-left: 30px;
`;
