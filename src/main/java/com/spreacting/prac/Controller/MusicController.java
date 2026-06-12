package com.spreacting.prac.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spreacting.prac.mapper.MusicMapper;
import com.spreacting.prac.model.Music;

@RestController
public class MusicController {

	private final MusicMapper musicMapper;

    MusicController(MusicMapper musicMapper) {
        this.musicMapper = musicMapper;
    }

    	@PostMapping("/musicform")
	public void music(@RequestBody Music music) {
		// System.out.println(">>> " + music);
		insertData(music);
		// System.out.println("데이터 적재 성공");
		// return "music";
	}

    @GetMapping("/musiclist")
    public List<Music> music() {
        var musics = musicMapper.selectAll();

        return musics;
    }

    @PostMapping("/musicvotes")
	public void musicVoteUpdate(@RequestBody String videoId, int votes) {
		musicMapper.updateByVideoId(videoId, votes);
	}

    public void insertData(Music music) {
        musicMapper.insert(music);
    }


/* 

0. url을 입력받음
1. https://www.youtube.com/oembed?url={url}로 get 요청을 보내서, 돌아오면 추려서 객체에 넣고 db에 집어넣기
2. music에다가 나머지 값을 전부 할당함... 

*/

    
}
