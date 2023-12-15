export default function Main() {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log(files[0]);
    } else {
      console.error("선택된 파일 없음.");
    }
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
      </div>
    </>
  );
}
