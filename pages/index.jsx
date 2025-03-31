import { useState,useEffect } from "react";

const QUESTIONS = [
  "돌멩이를 보면 뛰고 싶나요?",
  "비 오는 날 파를 자르고 싶은 충동이 있나요?",
  "냉장고를 믿으십니까?",
  "지구는 납작하다고 믿는 친구를 어떻게 대하시겠습니까?",
  "코끼리와 대화할 수 있다면 먼저 무슨 말을 하시겠습니까?",
  "라면 스프 먼저 넣나요, 면 먼저 넣나요?",
  "이 테스트가 인생을 바꿀 수 있다고 생각하십니까?",
  "고민될 땐 젓가락을 믿으시나요?",
];

const ANSWERS = ["진지하게 그렇다", "가끔 그렇다", "전혀 아니다", "감자라서 모르겠다"];

const RESULTS = [
  {
    code: "WTFJ",
    meanings: [
      "W - 왜 그러는지 몰라요",
      "T - 툭하면 울어요",
      "F - 피자 좋아함",
      "J - 진심임"
    ],
    description: [
      "✔ 말할 때 숨 참음",
      "✔ 하품할 때 울컥함",
      "✔ 남들이 웃을 때 혼자 진지함",
      "✔ 그래서 피자 좋아함"
    ]
  },
  {
    code: "LMAO",
    meanings: [
      "L - 라면만 먹고 살아요",
      "M - 뭐든 귀찮아요",
      "A - 아무 말 대잔치",
      "O - 오히려 좋아함"
    ],
    description: [
      "✔ 귀찮아서 하루에 세 번만 움직임",
      "✔ 인터넷 밈으로 대화함",
      "✔ 장난꾸러기 소울",
      "✔ 이상하게 인기 많음"
    ]
  },
  {
    code: "SUSY",
    meanings: [
      "S - 수상함이 삶의 기조",
      "U - 우유 마시면 울음",
      "S - 솔직히 거짓말 잘함",
      "Y - 예능감 폭발"
    ],
    description: [
      "✔ 항상 의심받지만 억울함",
      "✔ 실은 아무 생각 없음",
      "✔ 무표정으로 드립침",
      "✔ 혼자서도 잘 놈"
    ]
  },
  {
    code: "BAKA",
    meanings: [
      "B - 반쯤 잠들어 있음",
      "A - 아무거나 먹음",
      "K - 갑자기 튀어나옴",
      "A - 아이스크림 사랑함"
    ],
    description: [
      "✔ 자다가 웃음",
      "✔ 툭하면 놀람",
      "✔ 충동구매 만렙",
      "✔ 무지성 긍정맨"
    ]
  },
  {
    code: "NOPE",
    meanings: [
      "N - 너무 피곤함",
      "O - 오지랖 없음",
      "P - 평화주의",
      "E - 에너지 저장 중"
    ],
    description: [
      "✔ 절대 화 안내는 타입",
      "✔ 나가면 집 걱정, 집에 있으면 나가고 싶음",
      "✔ 말없이 사라짐",
      "✔ 밥 먹을 때만 빠름"
    ]
  },
  {
    code: "ZZZZ",
    meanings: [
      "Z - 잠듦",
      "Z - 또 잠듦",
      "Z - 계속 잠듦",
      "Z - 깨어있을 이유가 없음"
    ],
    description: [
      "✔ 앉으면 잠듦",
      "✔ 서있어도 졸림",
      "✔ 꿈에서 더 활발함",
      "✔ 졸림은 인생의 기본 상태"
    ]
  },
  {
    code: "HUHU",
    meanings: [
      "H - 혼잣말 자주함",
      "U - 우산을 잘 잃어버림",
      "H - 하루에 세 번 멍함",
      "U - 우주에 관심 많음"
    ],
    description: [
      "✔ 멍 때리는 시간이 하루의 핵심",
      "✔ 가끔 스스로랑 대화함",
      "✔ 갑자기 다이어리 씀",
      "✔ 밤하늘 보면 괜히 울컥함"
    ]
  },
  {
    code: "MEOW",
    meanings: [
      "M - 말수 적음",
      "E - 애교 폭발",
      "O - 오븐보단 전자레인지파",
      "W - 왜 사냐고 물으면 웃음"
    ],
    description: [
      "✔ 조용한데 존재감 있음",
      "✔ 고양이랑 텔레파시 가능할지도?",
      "✔ 냥이짤 저장 중독",
      "✔ 사람보다 이불을 더 사랑함"
    ]
  },
  {
    code: "YUMM",
    meanings: [
      "Y - 욕심 많음",
      "U - 우걱우걱 잘 먹음",
      "M - 맛집 탐험가",
      "M - 먹고 나면 잠듦"
    ],
    description: [
      "✔ 맛있는 거엔 진심",
      "✔ 배고프면 공격적임",
      "✔ 배불러도 디저트는 별도",
      "✔ 꿈에 음식 나옴"
    ]
  }
];

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("95fc590af24e2b028714d2eda6aec096");
      }
    };
    document.body.appendChild(script);
  }, []);
  const shareToKakao = () => {
    if (!window.Kakao) return;
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `내 병맛 MBTI는 ${result.code}!`,
        description: result.meanings.join(" / "),
        imageUrl: "https://via.placeholder.com/300x200.png?text=MBTI",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "나도 테스트하기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (step + 1 === QUESTIONS.length) {
      const randomResult = RESULTS[Math.floor(Math.random() * RESULTS.length)];
      setResult(randomResult);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
        {!result ? (
          <>
            <h1 className="text-2xl font-bold mb-4">MBTI 테스트</h1>
            <p className="text-lg mb-6">{QUESTIONS[step]}</p>
            <div className="space-y-3">
              {ANSWERS.map((a, idx) => (
                <button
                  key={idx}
                  className="w-full py-3 bg-pink-200 hover:bg-pink-300 rounded-xl text-sm font-medium transition"
                  onClick={() => handleAnswer(idx)}
                >
                  {a}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">당신의 MBTI는...</h2>
            <div className="text-3xl font-extrabold text-pink-500 mb-4">{result.code}</div>
            <ul className="mb-4 text-left list-disc list-inside space-y-1">
              {result.meanings.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
            <p className="font-bold mb-2">특징:</p>
            <ul className="text-left list-disc list-inside space-y-1">
              {result.description.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
            <div className="flex flex-col gap-3">
                <button
                className="mt-6 w-full bg-green-200 hover:bg-green-300 py-2 rounded-xl font-medium"
                onClick={reset}
                >
                다시 해보기
                </button>
                <button
                    className="w-full bg-yellow-300 hover:bg-yellow-400 py-2 rounded-xl font-medium"
                    onClick={shareToKakao}
                >
                    카카오톡으로 공유하기
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
