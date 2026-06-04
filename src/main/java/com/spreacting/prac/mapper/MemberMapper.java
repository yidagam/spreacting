package com.spreacting.prac.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

//멤버 모델에서 선언한 변수(객체)를 불러옴
import com.spreacting.prac.model.Member;

@Mapper
public interface MemberMapper {
    
    //SELECT * FROM member
    List<Member> selectAll();

    //SELECT * FROM member WHERE id = #{id}
    Member selectById(@Param("id") Long id);
}