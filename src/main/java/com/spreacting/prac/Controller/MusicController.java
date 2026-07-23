package com.spreacting.prac.Controller;

import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spreacting.prac.mapper.MusicMapper;
import com.spreacting.prac.model.Music;

@RestController
@RequiredArgsConstructor
public class MusicController {

	private final MusicMapper musicMapper;
    private final SseController sseController;
 
/* ************************************************************************* */

    // db 리스트 조회
        @GetMapping("/musiclist")
    public List<Music> music() {
        var musics = musicMapper.selectAll();

        return musics;
    }
    
    // db 리스트 조회
    @GetMapping("/musiclist/democ")
    public List<Music> music2() {
        var musics = musicMapper.selectAll2();

        return musics;
    }

/* ********** DB 업데이트 쿼리 ********** */

    // vote업데이트하는 기능
        @PostMapping("/musicvotes")
    public void musicVoteUpdate(@RequestBody Map<String, String> requestBody) {
        // 리액트에서 보낸 데이터의 key인 "video_id"로 값을 추출
        String videoId = requestBody.get("video_id");
        musicMapper.updateByVideoId(videoId);
        sseController.broadcastRefresh(); //DB갱신
    }

    // 플레이어에 감지된 music isPlaying=true 설정
        @PostMapping("/musicplayer/open")
    public void updateisPlayingData(@RequestBody Map<String, String> requestBody) {
        String videoId = requestBody.get("video_id");
        musicMapper.updateIsPlaying(videoId);
        sseController.broadcastRefresh(); //DB갱신
    }

    /* 
    // db에 음원(video) 추가하는 함수
    @PostMapping("/musicform")
	public void music(@RequestBody Music music) {
		// System.out.println(">>> " + music);

        // DB에 동일한 music(video)가 있으면 db에 추가하는 대신 votes 증가시킴
//이렇게 하는 대신 DB에서 videoId로 검색을 건 다음에 그게 있으면~ 으로 하는 게 낫겠다.
// 오류처리... 라는 사파적 방법으로 접근해보려고 했는데 오류가 너무 크게 나서 안되겠음..
//수정필!!!!!!!!

        try{
            musicMapper.insert(music);
    		// System.out.println("데이터 적재 성공");
        }
        catch(Error e){
            System.out.println(e);
            // System.out.println("중복 데이터가 있습니다");
            musicMapper.updateByVideoId(music.getVideoId());
        } finally {
            sseController.broadcastRefresh(); //DB갱신
        }
	}

/*
    // db에 음원(video) 추가하는 함수
    	@PostMapping("/musicform")
	public void music(@RequestBody Music music) {
		// System.out.println(">>> " + music);

        // DB에 동일한 music(video)가 있으면 db에 추가하는 대신 votes 증가시킴
        Music existingMusic = musicMapper.selectByVideoId(music.getVideoId());
        if(existingMusic == null || existingMusic.getVideoId() != music.getVideoId()){
            insertData(music);
    		// System.out.println("데이터 적재 성공");
        }
        else{
            // System.out.println("중복 데이터가 있습니다");
            musicMapper.updateByVideoId(music.getVideoId());
        }
        sseController.broadcastRefresh(); //DB갱신
	} */

    // db에 음원(video) 추가하는 함수
    @PostMapping("/musicform")
	public void insertMusic(@RequestBody Music music) {
		
        int cnt = musicMapper.countByVideoId(music.getVideoId());

        if(cnt>0){
            musicMapper.updateByVideoId(music.getVideoId());
        } else if (cnt <= 0){
            musicMapper.insert(music);
        }
        sseController.broadcastRefresh(); //DB갱신
	}

/* ********** DB 조작 쿼리(백업, 삭제) ********** */

    // 음악 삭제
    @PostMapping("/deletemusic")
    public void deletemusic(@RequestBody Map<String, String> requestBody) {
        String videoId = requestBody.get("video_id");

        //삭제
        musicMapper.delete(videoId);
        sseController.broadcastRefresh(); //DB갱신
    }



    // 한번만 재생(재생 끝나면 백업하고 삭제함)
        @PostMapping("/musicplayer/close")
    public void deleteData(@RequestBody Map<String, String> requestBody) {
        String videoId = requestBody.get("video_id");

        //백업
        Music music = musicMapper.selectByVideoId(videoId);
        musicMapper.insertMusicHistory(music);

        //삭제
        musicMapper.delete(videoId);
        sseController.broadcastRefresh(); //DB갱신
    }

    // 연속 재생(재생 끝나면 백업하고 vote랑 timestamp 초기화함)
    @PostMapping("/musicplayer/repeat")
    public void repeatData(@RequestBody Map<String, String> requestBody) {
        String videoId = requestBody.get("video_id");

        //백업
        Music music = musicMapper.selectByVideoId(videoId);
        musicMapper.insertMusicHistory(music);

        // vote 초기화
        // 시간대 초기화
        musicMapper.clearVoteTimestamp(videoId);

        sseController.broadcastRefresh(); //DB갱신
    }
}
