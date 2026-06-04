package com.spreacting.prac;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

// import com.spreacting.prac.mapper.MemberMapper;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class MyBatisApplication implements ApplicationRunner {
    
    // @Autowired
    // private MemberMapper memberMapper;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        // var members = memberMapper.selectAll();
        // log.info("회원목록 = {}", members);
        // log.info("==========");
        // var member = memberMapper.selectById(2L);
        // log.info("2번 회원 = {}", member);

    }

}
