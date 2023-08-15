
<img width="655" alt="SCR-20230815-qmsp-2 copy" src="https://github.com/team-opensource-plus/dummy-generator/assets/56494905/4cee5da0-979c-4c13-886d-dfaf9fe81dc5">

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/team-opensource-plus/dummy-generator) [![Node version](https://img.shields.io/badge/node_version-v16.20.1-blue)]() [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/dummy-generator) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/team-opensource-plus/dummy-generator)

# dummy-generator

Dummy-genenrator is a library that generates dummy data based on the schema you want. Especially, it is useful when you do some test. You might have tired of making dummy data for your test code. This library will help you to make dummy data easily.  

## required
* node version >= 16.20.1 

## Installation

1. Register and Login in to [OpenAPI](https://openai.com/)
2. Get API from [OpenAPI](https://platform.openai.com/account/api-keys)
3. Generate API token
    - which is like this `sk-xxxxxxxxxxxxxxxxxxxxxxxx`
4. Install dummy-generator
    ```bash
    $ npm install dummy-generator
    ```
5. Init dummy-generator
    ```bash
    $ dummy init
    ? Please input your API token: sk-xxxxxxxxxxxxxxxxxxxxxxxx
    ```


## Documentation

<!-- You can find the React documentation [on the website](https://react.dev/).  

Check out the [Getting Started](https://react.dev/learn) page for a quick overview.

The documentation is divided into several sections:

* [Tutorial](https://reactjs.org/tutorial/tutorial.html)
* [Main Concepts](https://reactjs.org/docs/hello-world.html)
* [Advanced Guides](https://reactjs.org/docs/jsx-in-depth.html)
* [API Reference](https://reactjs.org/docs/react-api.html)
* [Where to Get Support](https://reactjs.org/community/support.html)
* [Contributing Guide](https://reactjs.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/reactjs/reactjs.org). -->

## Config Examples
```
{
	"output_type": "json",
	"require_count": 10,
	"language": "en",
	"columns": [
		{
			"column-name": "name",
			"column-description": "unique name",
			"max-length": "3",
			"unique": true
		},
		{
			"column-name": "age",
			"column-description": "between 20 and 30",
			"max-length": "2",
			"unique": false
		}
	]
}
```

## Contributing




<!-- The main purpose of this repository is to continue evolving React core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### [Code of Conduct](https://code.fb.kkkcom/codeofconduct)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://reactjs.org/docs/how-to-contribute.html)

Read our [contributing guide](https://reactjs.org/docs/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React. -->


### License

React is [MIT licensed](./LICENSE).

<!-- ## 항해 플러스 2번째 프로젝트
목적 : 오픈소스를 직접 배포해보자

## 주제 
- 원하는 DB 스키마를 가지고 더미 데이터를 생성하는 라이브러리

## 사용방법 
// clone && root foler
1. $ sudo npm link
2. $ dummy g -f samples/user-data-config.json -o json 

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
