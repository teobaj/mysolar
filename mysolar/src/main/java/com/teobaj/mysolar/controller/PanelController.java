package com.teobaj.mysolar.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.teobaj.mysolar.exception.ResourceNotFoundException;
import com.teobaj.mysolar.exception.WrongKeyException;
import com.teobaj.mysolar.model.Panel;
import com.teobaj.mysolar.model.Report;
import com.teobaj.mysolar.model.User;
import com.teobaj.mysolar.repository.PanelRepository;
import com.teobaj.mysolar.repository.ReportRepository;
import com.teobaj.mysolar.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class PanelController {
    @Autowired
    PanelRepository panelRepository;
    
    @Autowired
    UserRepository userReporsitory;

    @Autowired
    ReportRepository ReportRepository;

    @GetMapping("/panel/{id}")
    public Panel getPanelById(@Valid @RequestHeader("apiKey") String apiKey,  @PathVariable(value="id") Long panelId){

        Panel panel = panelRepository.findById(panelId).orElseThrow(()-> new ResourceNotFoundException("Panel", "id", panelId));
        User user = userReporsitory.findById(panel.getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("user", "id", panel.getUser().getId()));
        if(user.getApiKey().equals(apiKey)){
            return panel;
        }else{
            throw new WrongKeyException("Wrong API Key");
        }
    }

    @PutMapping("/panel")
    public Panel createPanel(@Valid @RequestHeader("apiKey") String apiKey, @RequestBody Panel panel ){
        Optional<User> optionalUser = userReporsitory.findById(panel.getUser().getId());
        User user = optionalUser.get();
        if(user.getApiKey().equals(apiKey)){
            return panelRepository.save(panel);
        }else{
            throw new WrongKeyException(panel.getUser().getApiKey());
        }   
    }
    @GetMapping("/lastweek/{id}")
    public List<Report> getLastWeekRaports(@Valid @RequestHeader("apiKey") String apiKey, @PathVariable(value = "id") Long panelId){
        Panel panel = panelRepository.findById(panelId).orElseThrow(()-> new ResourceNotFoundException("panel", "id", panelId));

        User user = userReporsitory.findById(panel.getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("user", "id", panel.getUser().getId()));

        if(user.getApiKey().equals(apiKey)){
                
            Date date = new Date();
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.add(Calendar.DATE, -7);
            Date currentDate = c.getTime();
            List<Report> mylist = panelRepository.getLastWeekRaports(panelId, currentDate);
            if(mylist.isEmpty()) throw new ResourceNotFoundException("reports", "panelId", panelId);
            return mylist;
        }else{
            throw new WrongKeyException("WrongApiKey");
        }
    } 

    @GetMapping("/{id}/panel")
    public List<Panel> getAllPanels(@Valid @RequestHeader("apiKey") String apiKey, @PathVariable(value = "id") Long userId){
        User user = userReporsitory.findById(userId).orElseThrow(()-> new ResourceNotFoundException("user", "id", userId));
        if(user.getApiKey().equals(apiKey)){
            return panelRepository.getAllUserPanels(userId);
        }else{
            throw new WrongKeyException(user.getApiKey() + "!=" + apiKey);
        }
    }

    @PostMapping("/panel/{id}")
    public Panel updatePanel(@Valid @RequestHeader("apiKey") String apiKey, @PathVariable(value = "id") Long panelId, @RequestBody Panel panelUpdated) {
        Panel panel = panelRepository.findById(panelId).orElseThrow(()-> new ResourceNotFoundException("panel", "id", panelId));
        User user = userReporsitory.findById(panel.getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("user", "id", panel.getUser().getId()));
        
        if(user.getApiKey().equals(apiKey)){
            panel.setPeakCurrent(panelUpdated.getPeakCurrent());
            panel.setPeakVoltage(panelUpdated.getPeakVoltage());
            panel.setCity(panelUpdated.getCity());
            return panelRepository.save(panel);
        }else{
            throw new WrongKeyException("Wrong key");
        }

    }
    @DeleteMapping("/panel/{id}")
    public ResponseEntity<?> deletePanel(@PathVariable(value = "id") Long id, @RequestHeader("apiKey") String apiKey){
        Panel panel = panelRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Panel", "id", id));
        User user = userReporsitory.findById(panel.getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("user", "id", panel.getUser().getId()));

        if(user.getApiKey().equals(apiKey)){
            panelRepository.delete(panel);
            return ResponseEntity.ok().build();
        }else{
            throw new WrongKeyException(apiKey);
        }
    }
    


}