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


    // db에 음원(video) 추가하는 함수
    	@PostMapping("/musicform")
	public void music(@RequestBody Music music) {
		// System.out.println(">>> " + music);

        // DB에 동일한 music(video)가 있으면 db에 추가하는 대신 votes 증가시킴
        if(musicMapper.selectById(music.getVideoId()) != null){
            insertData(music);
    		// System.out.println("데이터 적재 성공");
        }
        else{
            musicMapper.updateByVideoId(music.getVideoId());
        }
        sseController.broadcastRefresh(); //DB갱신
	}


    // db 리스트 조회
        @GetMapping("/musiclist")
    public List<Music> music() {
        var musics = musicMapper.selectAll();

        return musics;
    }

    // @PostMapping("/musicvotes")
	// public void musicVoteUpdate(@RequestBody String videoId) {
	// 	musicMapper.updateByVideoId(videoId);
	// }

    // vote업데이트하는 기능
        @PostMapping("/musicvotes")
    public void musicVoteUpdate(@RequestBody Map<String, String> requestBody) {
        // 리액트에서 보낸 데이터의 key인 "video_id"로 값을 추출
        String videoId = requestBody.get("video_id");
        musicMapper.updateByVideoId(videoId);
        sseController.broadcastRefresh(); //DB갱신
    }

    public void insertData(Music music) {
        musicMapper.insert(music);
    }

    //데이터 삭제하는 함수
        @PostMapping("/musicplayer")
    public void deleteData(@RequestBody Map<String, String> requestBody) {
        String videoId = requestBody.get("video_id");
        musicMapper.delete(videoId);
        sseController.broadcastRefresh(); //DB갱신
    }

}
