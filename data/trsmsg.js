// getDate, getTime, getDateTime 함수 수정
export const getTime = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  let day = String(now.getDate()).padStart(2, '0');
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');

  let yymmdd = `${year}${month}${day}`;
  let time = `${hours}${minutes}${seconds}`; // 6자리 시간 (HHMMSS)

  return {
    getDate: () => yymmdd,
    getTime: () => time,
    getDateTime: () => yymmdd + time
  };
};

// getTime() 함수를 호출하여 필요한 값들에 할당
const timeUtils = getTime();

export const form300 = {
  colNum: [12, 23, 18],
  colCommInitVal: [
    "300",
    "31",
    "V100",
    "7000",
    timeUtils.getDate(), // 거래일자
    timeUtils.getTime(), // 거래시간
    timeUtils.getDateTime(), // 추적번호
    "OFF",
    "",
    "",
    ""
  ],
  colCommNames: [
    "전문유형",
    "업무구분",
    "전문버젼",
    "제휴사코드",
    "거래일자",
    "거래시간",
    "추적번호",
    "채널유형",
    "응답코드",
    "인가번호",
    "부가정보",
    "FILLER"
  ],

  colBodyInitVal: [
    "3000",                // 브랜드코드
    "3000",                // 가맹점코드
    "1",                   // 회원식별구분코드
    "7775010000000496",    // 회원식별구분값
    "B",                   // 적립사용수단
    "",                    // 본인인증구분
    "",                    // 비밀번호/본인인증요청번호
    "10000",               // 총매출금액
    "0",                   // 총할인금액
    "0",                   // 멤버십할인금액
    timeUtils.getDate(),      // 결제일자
    timeUtils.getDate(),     // 매출일자
    "1001",                // 거래사유코드
    "",            // 원통합승인일자
    "",          // 원통합승인번호
    "",  // 원고유식별번호
    "dev",              // 사용자ID
    "BENE" + timeUtils.getDateTime() + "_yjh",   // 참여사고유식별번호
    "",                    // 결제(주문)번호
    "",                    // 비고
    "1",                   // 사용총건수
    "11",                  // 포인트사용유형
    "2000"                // 사용/사용취소포인트
  ],
  colBodyNames: [
    "브랜드코드",
    "가맹점코드",
    "회원식별구분코드",
    "회원식별구분값",
    "적립사용수단",
    "본인인증구분",
    "비밀번호/본인인증요청번호",
    "총매출금액",
    "총할인금액",
    "멤버십할인금액",
    "결제일자",
    "매출일자",
    "거래사유코드",
    "원통합승인일자",
    "원통합승인번호",
    "원고유식별번호",
    "사용자ID",
    "참여사고유식별번호",
    "결제(주문)번호",
    "비고",
    "사용총건수",
    "포인트사용유형",
    "사용/사용취소포인트"
  ],
  colResNames: [
    "업무구분",
    "전문유형",
    "전문버전",
    "제휴사코드",
    "거래일자",
    "거래시간",
    "추적번호",
    "채널유형",
    "응답코드",
    "FILLER",
    "응답메세지",
    "응답메세지2",
    "응답메세지3",
    "통합승인일자",
    "통합승인번호",
    "사용/사용취소포인트",
    "가용포인트",
    "FILLER"
  ]
};

export const Trsmsg = [
  { key: "200", label: "[200] 포인트 적립" },
  { key: "300", label: "[300] 포인트 사용" },
  { key: "400", label: "[400] 포인트 혼합(적립_사용)" }
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
  console.log("[" + trsMsgCd + "]" + "조회 데이터 성공");
  console.log(data);
  return data;
};

export const sendTrsmsg = async (trsMsgCd, requestData) => {
  console.log("getTrsmsgForm======");
  console.log(requestData)
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
  console.log("[" + trsMsgCd + "]" + "포맷 조회 데이터 성공.");
  console.log(data);
  return data;
};
// export const reqTrsmsg = async (trsMsgCd, jsonObject) => {
//   try {
//     const response = await axios.post(http://localhost:8080/getFormat/TR/${trsMsgCd}, jsonObject);
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


