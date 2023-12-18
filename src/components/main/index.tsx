import { useState } from "react";
import styled from "styled-components";
import Header from "../header";

type RowData = {
  ip: string;
  timestamp: string;
  method: string;
  path: string;
  protocol: string;
  status: string;
};

export default function Main() {
  const [data, setData] = useState<RowData[]>([]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = (e.target?.result as string) || "";
      const lines = text.split("\n");
      const parsedData: RowData[] = lines.map((line) => {
        // 공백을 기준으로 데이터 분할
        const parts = line.split(" ");
        if (parts.length < 6) {
          // 데이터 형식이 맞지 않는 경우 빈 객체 반환
          return { ip: "", timestamp: "", method: "", path: "", protocol: "", status: "" };
        }
        const ip = parts[0];
        const timestamp = parts[1];
        const method = parts[2];
        const path = parts[3];
        const protocol = parts[4];
        const status = parts[5];

        return { ip, timestamp, method, path, protocol, status };
      });

      setData(parsedData.filter((row) => row.ip)); // 빈 객체는 필터링
    };
    reader.readAsText(files[0]);
  };

  return (
    <>
      <Header />
      <MainSection>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={changeHandler}
          style={{ display: "block", margin: "10px auto" }}
        />
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>IP</th>
              <th>Timestamp</th>
              <th>Method</th>
              <th>Path</th>
              <th>Protocol</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.ip}</td>
                <td>{row.timestamp}</td>
                <td>{row.method}</td>
                <td>{row.path}</td>
                <td>{row.protocol}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  margin: 0.5rem;
`;

const Table = styled.table`
  // 스타일을 추가하세요
`;
