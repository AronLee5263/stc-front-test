import Papa from "papaparse";
import { useState } from "react";

type ParsedDataType = { [key: string]: string };

export default function Main() {
  const [parsedData, setParsedData] = useState<ParsedDataType[]>([]);
  const [tableRows, setTableRows] = useState<string[]>([]);
  const [values, setValues] = useState<string[][]>([]);

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
        // console.log(results.data);
        const rowsArray: string[][] = [];
        const valuesArray: string[][] = [];

        const data = results.data as ParsedDataType[];

        data.forEach((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(data); // 타입 오류 수정

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  return (
    <>
      <h2 style={{ display: "block", margin: "3rem " }}> csv 파일을 업로드 하세요</h2>
      <div>
        {/* File Uploader */}
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={changeHandler}
          style={{ display: "block", margin: "10px auto" }}
        />

        <br />
        <br />
        {/* Table */}
        <table>
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
