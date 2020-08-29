package com.teobaj.mysolar.repository;

import java.util.Collection;
import java.util.List;

import com.teobaj.mysolar.model.Panel;
import com.teobaj.mysolar.model.Report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReportRepository extends JpaRepository<Report,Long>{
}