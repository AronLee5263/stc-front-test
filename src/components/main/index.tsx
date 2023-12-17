import Papa from "papaparse";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../header";

type ParsedDataType = { [key: string]: string };

export default function Main() {
  const [parsedData, setParsedData] = useState<ParsedDataType[]>([]);
  const [pathData, setPathData] = useState<ParsedDataType[]>([]);

  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  // const [colums, setColums] = useState<string[][]>([]);
  const classifiedData: string[] = [];

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("파일이 선택되지 않았습니다.");
      return; // 파일이 선택되지 않았을 경우 리턴
    }

    Papa.parse(files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results);

        const data = results.data as ParsedDataType[];
        // const valuesArray: string[][] = [];
        const headers = Object.keys(data[0]);

        setTableHeaders(headers);

        // data.forEach((d) => {
        //   // rowsArray.push(Object.keys(d));
        //   valuesArray.push(Object.values(d));
        // });

        // parsedData를 공백을 기준으로 값들을 나누어 수정
        const modifiedData = data.map((item) => {
          const newItem: ParsedDataType = {};
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              const value = item[key];
              newItem[key] = typeof value === "string" ? value.split(" ").slice(2, 4).join(" ") : value;
            }
          }
          return newItem;
        });

        setParsedData(data);
        setPathData(modifiedData);

        // setTableHeaders(rowsArray[0]);
        // setColums(valuesArray);
      },
    });
  };

  // useEffect(() => {
  //   console.log("parsedData : ", parsedData);
  //   console.log("tableHeaders : ", tableHeaders);
  //   console.log("colums : ", colums);
  // }, [colums]);

  return (
    <>
      <Header />

      <MainSection>
        {/* <OrderText> csv 파일을 업로드 하세요</OrderText> */}
        <div>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={changeHandler}
            style={{ display: "block", margin: "10px auto" }}
          />

          <br />
          <br />

          <table>
            <thead>
              <tr>
                {tableHeaders.map((rows, index) => {
                  return <th key={index}> {rows}</th>;
                })}
              </tr>
            </thead>

            <tbody>
              {pathData.map((row, index) => {
                return (
                  <tr key={index}>
                    {tableHeaders.map((header, i) => {
                      return <td key={i}>{row[header]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </MainSection>
    </>
  );
}

const OrderText = styled.div`
  margin: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

const MainSection = styled.div`
  margin: 0.5rem;
  /* border: 3px solid red; */
`;
