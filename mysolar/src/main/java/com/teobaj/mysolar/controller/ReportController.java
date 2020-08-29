package com.teobaj.mysolar.controller;

import java.util.List;

import javax.validation.Valid;

import com.teobaj.mysolar.exception.ResourceNotFoundException;
import com.teobaj.mysolar.model.Report;
import com.teobaj.mysolar.repository.ReportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api")
public class ReportController {
    @Autowired
    ReportRepository reportRepository;

    @CrossOrigin(origins = "192.168.1.2")
    @PostMapping(value="/report")
    public Report createReport(@RequestBody Report report) {
        return reportRepository.save(report);
    }
    
    @GetMapping(value="/report/{id}")
    public Report getReport(@PathVariable(value = "id") Long id){
        return reportRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("report", "id", id));
    }
    
    
}