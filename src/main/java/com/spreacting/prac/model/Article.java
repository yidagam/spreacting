package com.spreacting.prac.model;

import java.util.Date;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor; 


// db의 값을 자바 객체(변수)에 담을 수 있도록 미리 선언해주는
// DTO(Data Transfer Object) 클래스 파일
// DTO는 데이터베이스에서 직접 가져온 데이터나 외부 시스템과의 통신에서 사용되는 데이터를 나타내는 데 사용됩니다. 출처: https://hulrud.tistory.com/98 [주독야독:티스토리]

@Data
@Builder 
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    private Long id; 
    private String title;
    private String description;
    private Date created;
    private Date updated;
    private Long memberId;
}