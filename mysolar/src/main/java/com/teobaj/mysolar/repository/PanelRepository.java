package com.teobaj.mysolar.repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.teobaj.mysolar.model.Panel;
import com.teobaj.mysolar.model.Report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PanelRepository extends JpaRepository<Panel, Long> {
    
    //get last week raports for a panel
    @Query(value = "SELECT u FROM Report u WHERE u.panel.id = ?1 and u.createdAt >= ?2")
    public List<Report> getLastWeekRaports(Long id, Date date);

    @Query(value = "SELECT p FROM Panel p WHERE p.user.id = ?1")
    public List<Panel> getAllUserPanels(Long id);
}