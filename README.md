# dummy-generator
- Logo Image 
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://github.com/team-opensource-plus/dummy-generator/assets/56494905/4cee5da0-979c-4c13-886d-dfaf9fe81dc5" width="350px" alt="dummy-generator-logo" /></a>
</p>

<p align="center"> <a href="https://openai.com/chatgpt" target="blank">ChatGPT</a> 기반 더미 데이터 생성 CLI</p>
<p align="center">
    <a href="https://github.com/team-opensource-plus/dummy-generator"><img src="https://camo.githubusercontent.com/83d3746e5881c1867665223424263d8e604df233d0a11aae0813e0414d433943/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667" alt="GitHub license" data-canonical-src="https://img.shields.io/badge/license-MIT-blue.svg" style="max-width: 100%;"></a> 
    <a href="">
    <img src="https://camo.githubusercontent.com/4633815e310c7010bc662f2c175a4dac65c37e5269054616ef84c8eb61f8656c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64655f76657273696f6e2d7631362e32302e312d626c7565" alt="Node version" data-canonical-src="https://img.shields.io/badge/node_version-v16.20.1-blue" style="max-width: 100%;"></a> <a href="https://www.npmjs.com/package/dummy-generator" rel="nofollow">
    <img src="https://camo.githubusercontent.com/b0efd51353e4a3937bc25ac06346638f036c8382e08d6537cc1270c0c593fe68/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e706d5f76657273696f6e2d76382e31392e342d626c7565" alt="npm version" data-canonical-src="https://img.shields.io/badge/npm_version-v8.19.4-blue" style="max-width: 100%;"></a> <a href="https://github.com/team-opensource-plus/dummy-generator">
    <img src="https://camo.githubusercontent.com/b0ad703a46e8b249ef2a969ab95b2cb361a2866ecb8fe18495a2229f5847102d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667" alt="PRs Welcome" data-canonical-src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" style="max-width: 100%;"></a>
</p>

## 설명
Dummy-Generator CLI는 ChatGPT 기반 테스트용 데이터를 생성해주는 명령줄 인터페이스 도구 입니다. 
{data-config} 파일을 작성하여 원하는 샘플 데이터들을 생성할 수 있습니다. Generate 명령에는 ChatGPT Token값이 필요 합니다. 
요청된 Data 크기에 따라 ChatGPT 사용료가 과금될 수 있습니다.
여러건의 샘플 데이터를 명령어 하나로 생성해보세요.

CLI는 openai패키지를 사용합니다. 

## 설치
```
$ npm install -g dummy-generator
``` 

## Quick Start

### 1. token 인증 
- GPT 토큰 발행 자세한 방법은 여기를 클릭해 주세요. 
``` 
$dummy init sk-xxxxxxxxxxxxxxxxxxxxxxxx
``` 
### 2. 생성
- 2-1. data-config.json 파일 작성
``` 
<!-- project root folder -->
vi samples/user-data-config.json
``` 
``` 
{
	"output_type": "json",
	"require_count": 10,
	"columns": [
		{
			"column-name": "name",
			"column-description": "한국 사람 이름",
			"max-length": "3",
			"unique": true
		},
		{
			"column-name": "age",
			"column-description": "나이",
			"max-length": "2",
			"unique": false
		}
	]
}

``` 

- 2-2. generate 명령어 실행
``` 
$ dummy g -f samples/user-data-config.json -o json
``` 

## 지원 명령어 
<!-- 테이블 형태 -->
<!-- 명령어 / 옵션 정리 -->
- generate : 
-- option  :

## Requirements
- node >= 
- npm >= 

## License
Dummy-Generator는 MIT LICENSE 입니다. 
