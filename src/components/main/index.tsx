import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../header";
import RechartsGragh from "../../reCharts/index";

type RowData = {
  ip: string;
  timestamp: string;
  method: string;
  path: string;
  protocol: string;
  status: string;
};

export default function Main() {
  const [csvData, setCsvData] = useState<RowData[]>([]);
  const [methodData, setMethodData] = useState<{ name: string; count: number }[]>([]);
  const [statusData, setStatusData] = useState<{ name: string; count: number }[]>([]);

  const [isSorted, setIsSorted] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

  // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

  // const renderLineChart = (
  //   <LineChart width={600} height={300} data={data}>
  //     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  //     <CartesianGrid stroke="#ccc" />
  //     <XAxis dataKey="name" />
  //     <YAxis />
  //   </LineChart>
  // );

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

      setCsvData(parsedData.filter((row) => row.ip)); // 빈 객체는 필터링
    };
    reader.readAsText(files[0]);
  };

  useEffect(() => {
    const methodCounts: { [key: string]: number } = {};
    const statusCounts: { [key: string]: number } = {};

    csvData.forEach((row) => {
      const { method, status } = row;
      methodCounts[method] = (methodCounts[method] || 0) + 1;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    setMethodData(Object.entries(methodCounts).map(([name, count]) => ({ name, count })));
    setStatusData(Object.entries(statusCounts).map(([name, count]) => ({ name, count })));
  }, [csvData]);

  const handleSortByMethod = () => {
    const sortedData = [...csvData];
    sortedData.sort((a, b) => {
      if (isAscending) {
        return a.method.localeCompare(b.method);
      } else {
        return b.method.localeCompare(a.method);
      }
    });
    setIsAscending(!isAscending);
    setIsSorted(true);
    setCsvData(sortedData);
    console.log(sortedData);
  };

  return (
    <>
      <Header />
      <RechartsGragh methodData={methodData} statusData={statusData} />
      <MainSection>
        <OrderText>아래 form에서 프로젝트에 포함된 csv 파일을 첨부하세요</OrderText>
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
              <th>IP </th>
              <th>Timestamp</th>
              <SortableHeader
                onClick={handleSortByMethod}
                className={isSorted ? (isAscending ? "sorted-asc" : "sorted-desc") : ""}
              >
                Method (button)
              </SortableHeader>
              <th>Path</th>
              <th>Protocol </th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                <td>{row.ip}&nbsp;&nbsp;&nbsp;</td>
                <td>{row.timestamp}&nbsp;&nbsp;&nbsp;</td>
                <td>{row.method}</td>
                <td>&nbsp;&nbsp;&nbsp;{row.path}&nbsp;</td>
                <td>{row.protocol}&nbsp;&nbsp;&nbsp;</td>
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
  margin-top: 1rem;
  margin-left: 1rem;
`;

const Table = styled.table`
  // 스타일을 추가하세요
`;

const OrderText = styled.div`
  margin-left: 1.5rem;
`;

const SortableHeader = styled.th`
  cursor: pointer;
  background-color: #2196f3;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;

  &.sorted-asc {
    background-color: #2196f3;
    color: white;
  }

  &.sorted-desc {
    background-color: #2196f3;
    color: white;
  }
`;

// const Example = styled.div`

// `;
