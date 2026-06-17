package com.spreacting.prac.model;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Music {

    private int id;                     // 적재된 순서
    private String url;                 // 유튜브 영상 url
    private String videoId;             // 유튜브 영상 id (url에서 추출한 문자열)
    private String title;               // 영상명
    private String author;              // 채널명
    private int duration;               // 길이
    private Integer playTimes;          // 재생횟수
    private Integer votes;              // 투표수
    private Integer isPlaying;          // 재생 중인지 확인
    private LocalDateTime createdAt;    // DB에 추가한 시간
    private String thumbnail;           // 썸네일 이미지 주소
    private String iframe;              // html iframe 코드

}

/*

CREATE TABLE MUSIC (
	id		NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY,
    
	url		VARCHAR2(2000) NOT NULL,
    video_id VARCHAR2(50) NOT NULL,

	title		VARCHAR2(600),
	author		VARCHAR2(300),
	
    duration	NUMBER DEFAULT 0,
	play_times	NUMBER DEFAULT 0,
	votes		NUMBER DEFAULT 0,
	is_plaing	NUMBER DEFAULT 0,
	
	created_at	TIMESTAMP DEFAULT SYSTIMESTAMP,
    thumbnail    VARCHAR2(2000),
	iframe		CLOB
);

*/