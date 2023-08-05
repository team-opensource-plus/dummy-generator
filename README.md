# dummy-generator
## 항해 플러스 2번째 프로젝트
목적 : 오픈소스를 직접 배포해보자

## 주제 
- 원하는 DB 스키마를 가지고 더미 데이터를 생성하는 라이브러리


## 스택
- chat GPT api
- Typescript
- Commander cli 

## 단계별 TODO list
1. GPT를 이용한 더미 데이터 생성
    a. 컬럼입력, 데이터 형식 등을 입력해서 더미 데이터를 생성 - (json 파일)
2. CLI로 생성한 더미 데이터를 mysql로 입력
     a. 1.a에 생성한 데이터를 mysql config 파일에 있는 sql서버로 insert까지

## 사용자 user Interface 예상 시나리오
- **사용자 관점 사용방법**
1. API access Token 설정(ChatGPT) - CLI
2. 컬럼 생성 TS (JS) 형식으로 주어진 타입?으로 만들기
    1. 원하는 데이터의 설명도 같이 넣기
3. cli 로 더미 생성
4. mysql 서버 정보 설정(config)
5. cli로 더미 insert 실행

