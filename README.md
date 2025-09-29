
## 경영진 / 매니저를 위한 웹기반 탄소 배출량 대시보드
**Next.js 14(App Router) + React 18 + TypeScript + Tailwind + shadcn + Zustand** 

## 실행방법 
* Node.js v.18.17 이상
* pnpm i / npm i
* pnpm dev / npm run dev
  * http://localhost:3000

## 기능요약
* 레이아웃 : 상단 헤더(다크모드 토글), 좌측 사이드 바(회사별 필터 기능), 우측 메인(막대 그래프 차트)

* 필터 :
  * 회사 선택, 년-월 선택
  * 필터 상태를 전역으로 분리
* 요약 카드 : 연간 누계, 월평균, 최근기록(상승/하락 아이콘과 파랑/빨강 색상으로 월평균 대비 증감률 확인)
* 차트 :
  *  그래프 막대에 진입 애니메이션, Pulse 효과
  *  막대에 hover하여 평균대비, 전원대비 증감률 요약 UI 출력
* 팔레트 :
  * globals.css에 라이트/다크모드 별 팔레트 작성
 
## 기술스택
* Next.js 14
* React + Typescript
* Tailwind CSS + Shadcn
  * shadcn에서 Button, Card, Input, Select 경량 추출해서 사용
* Zustand
  * 다크/라이트 모드 토글상태, 필터 상태를 전역으로 분리해서 사용


## 디자인 
* 페이지 첫 진입 시 막대에 애니메이션이 나오고, pulse 효과로 생동감을 주는 것으로 주목성을 높힘
* 상단 헤더에서 다크모드 토글버튼을 배치해 장시간 페이지를 주시해도 부담이 없도록 함
* 주식 그래프처럼 증감을 빨강/파랑색으로 구분하고, 전월/평균 대비 증감률을 숫자로 보여주는 것으로 차트 분석에 보다 용이하도록 함
* 미려하고 복잡한 UI 보단 정보 전달 목적에 맞게 단색 위주 팔레트를 만들어 모던한 색상과 카드 형태의 UI 사용

## 렌더링
* shadcn에서 필요한 UI만 가져와 사용하고, 차트도 라이브러리 없이 svg로 직접 구현하여 번들을 가볍게 유지
* 마운트 시 애니메이션은 transform: scaleY + transition-delay(stagger)
* hover 툴팁은 index에 따라 해당 바만 렌더링
* zustand로 필터상태를 관리하여 필요할 때만 다시 렌더링
  


