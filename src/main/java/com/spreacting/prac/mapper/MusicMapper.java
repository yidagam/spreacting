package com.spreacting.prac.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

//멤버 모델에서 선언한 변수(객체)를 불러옴
import com.spreacting.prac.model.Music;

@Mapper
public interface MusicMapper {
    
    //SELECT * FROM member <? 왜 member지
    List<Music> selectAll();
    List<Music> selectAll2();
    //SELECT * FROM member WHERE id = #{id}
    Music selectByVideoId(@Param("videoId") String videoId);
    Integer countByVideoId(@Param("videoId") String videoId);

    void insert(@Param("music") Music music);
    void delete(@Param("videoId") String videoId);

    // 데이터 업데이트
    void updateByVideoId(@Param("videoId") String videoId);
    void updateIsPlaying(@Param("videoId") String videoId);

    // 백업&데이터 일부 초기화 
    void insertMusicHistory(@Param("music") Music music);
    void clearVoteTimestamp(@Param("videoId") String videoId);
}