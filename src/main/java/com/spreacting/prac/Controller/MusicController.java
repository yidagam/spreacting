package com.spreacting.prac.Controller;

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

    	@PostMapping("/music")
	public void music(@RequestBody Music music) {
		System.out.println("통신 성공");
		System.out.println(">>> " + music);
		insertData(music);
		// return "music";
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
