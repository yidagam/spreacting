package com.spreacting.prac;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PracApplication {

	public static void main(String[] args) {
		SpringApplication.run(PracApplication.class, args);
	}

}

/*
	D:\work\study\prac 경로에서 gradlew build 입력시 
	D:\work\study\prac\build\libs 경로에 .jar 파일 생성됨.
	해당 파일 실행 시 (예: java -jar build/libs/prac-0.0.1-SNAPSHOT.jar) 
	PracApplication.java를 run java 한 것과 같은 결과가 나온다.
	(아마 버전 관리 용인 것 같음.)

	도움 받음
	https://velog.io/@u-nij/Spring-Boot-React.js-개발환경-세팅
*/