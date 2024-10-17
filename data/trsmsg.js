import { request } from "http";

export const Trsmsg = [
    {key: "200", label: "[200] 포인트 적립"},
    {key: "300", label: "[300] 포인트 사용"},
    {key: "400", label: "[400] 포인트 혼합(적립_사용)"}
  ];

export const getTrsmsgForm = async (trsMsgCd) => {
  console.log("getTrsmsgForm======");
  console.log("http://localhost:8080/getFormat/TR" + trsMsgCd);

  const response = await fetch("http://localhost:8080/getFormat/TR" + trsMsgCd, {
                                method: 'GET',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                cache: 'no-store'
                                });
  const data = response.json();
  console.log("[" + trsMsgCd  + "]" + "포맷 조회 데이터 성공.");
  console.log(data);
  return data;                             
};

export const sendTrsmsg = async (trsMsgCd, requestData) => {
  console.log("getTrsmsgForm======");
  console.log("http://localhost:8080/reqTR" + trsMsgCd);

  const response = await fetch("http://localhost:8080/reqTR" + trsMsgCd, {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(requestData),
                                cache: 'no-store'
                                });
  const data = response.json();
  console.log("[" + trsMsgCd  + "]" + "포맷 조회 데이터 성공.");
  console.log(data);
  return data;                             
};
// export const reqTrsmsg = async (trsMsgCd, jsonObject) => {
//   try {
//     const response = await axios.post(`http://localhost:8080/getFormat/TR/${trsMsgCd}`, jsonObject);
//     return response.data; // 서버로부터 받은 데이터 반환
//   } catch (error) {
//     console.error("API 요청 오류:", error);
//     throw error; // 오류를 호출자에게 전달
//   }
// };


export const reqTrsmsg = async (trsMsgCd, jsonObject) => {
  console.log("reqTrsmsg======");
  console.log("http://localhost:8080/reqTr" + trsMsgCd);

  const response = await fetch("http://localhost:8080/reqTr" + trsMsgCd, {
                                method: 'GET',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                cache: 'no-store',
                                data: jsonObject
                                });
  const data = response.json();
  //console.log(jsonStringfy(data));
  return data;                             
};

export const getCommData = (tsmMsgCd) => {
  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  let day = String(now.getDate()).padStart(2, '0');
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');

  let yymmdd = `${year}${month}${day}`;
  
  // 6자리 시간 (HHMMSS)
  let time = `${hours}${minutes}${seconds}`;

  let arr =  [
      [tsmMsgCd,  "3", "R", " ", "전문유형"],
      ["",  "2", "R", " ", "업무구분"],
      ["",  "4", "R", " ", "전문버전"],
      ["",  "4", "R", " ", "제휴사코드"],
      [yymmdd,  "8", "R", " ", "거래일자"],
      [time,  "6", "R", " ", "거래시간"],
      [yymmdd + time,  "18", "R", " ", "추적번호"],
      ["",  "3", "R", " ", "채널유형"],
      ["",  "5", "R", " ", "응답코드"],
      ["", "15", "R", " ", "인가번호"],
      ["", "20", "R", " ", "부가정보"],
      ["", "12", "R", " ", "FILLER"] 
  ];

  return arr; // 결과 배열 반환
};
