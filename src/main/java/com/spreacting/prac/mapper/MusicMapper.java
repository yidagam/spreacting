package com.spreacting.prac.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

//멤버 모델에서 선언한 변수(객체)를 불러옴
import com.spreacting.prac.model.Music;

@Mapper
public interface MusicMapper {
    
    //SELECT * FROM member
    List<Music> selectAll();

    //SELECT * FROM member WHERE id = #{id}
    Music selectById(@Param("id") Long id);

    void insert(@Param("music") Music music);
}