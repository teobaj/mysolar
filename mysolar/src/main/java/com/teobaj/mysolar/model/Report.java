package com.teobaj.mysolar.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="reports")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
public class Report implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Double voltage;

    @NotNull
    private Double current;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="panel_id", nullable = false)
    private Panel panel;

    public Long getId() {
        return id;
    }
    public Double getVoltage() {
        return voltage;
    }
    public void setVoltage(Double voltage) {
        this.voltage = voltage;
    }
    public Double getCurrent() {
        return current;
    }
    public void setCurrent(Double current) {
        this.current = current;
    }
    @JsonIgnore
    public Panel getPanel() {
        return panel;
    }
    @JsonProperty
    public void setPanel(Panel panel) {
        this.panel = panel;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    
}