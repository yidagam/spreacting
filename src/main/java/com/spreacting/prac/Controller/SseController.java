package com.spreacting.prac.Controller; // 프로젝트 패키지명에 맞게 수정

import org.springframework.http.MediaType;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
// @CrossOrigin(origins = "http://localhost:8080") // 리액트 주소 허용 (CORS 에러 방지)
public class SseController {

    // 연결객체 담는 배열
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    // SSE최초연결
    @GetMapping(value = "/sse/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {

        SseEmitter emitter = new SseEmitter(1800000L); // 30분 타임아웃
        emitters.add(emitter);

        // 연결객체 제어
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));


        // 연결 끊기는 것을 방지하기 위한 최초 데이터 전송
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connectedOK"));
        } catch (IOException e) {
            emitters.remove(emitter);
        }

        return emitter;
    }

    //  
    public void broadcastRefresh() {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name("refresh")
                        .data("update_trigger"));
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }
}