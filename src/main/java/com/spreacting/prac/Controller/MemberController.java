package com.spreacting.prac.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spreacting.prac.mapper.MemberMapper;
import com.spreacting.prac.model.Member;

@RestController
public class MemberController {

    @Autowired
    private MemberMapper memberMapper;
    
    @GetMapping("/member")
    public List<Member> test() {
        var members = memberMapper.selectAll();

        return members;
    }
    
}