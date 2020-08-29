package com.teobaj.mysolar.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="panels")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value={"createdAt", "updatedAt"}, allowGetters = true)
public class Panel implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //All the values are in international system
    // Peak Voltage
    @NotNull
    private Double peakVoltage;

    //Peak Current
    @NotNull
    private Double peakCurrent;

    @NotBlank
    @JsonProperty
    private String city;


    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "panel")
    private Set<Report> reports;

    public Set<Report> getReports() {
        return reports;
    }
    public void setReports(Set<Report> reports) {
        this.reports = reports;
    }
    @JsonIgnore
    public User getUser() {
        return user;
    }
    @JsonProperty
    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public Double getPeakVoltage() {
        return peakVoltage;
    }
    public void setPeakVoltage(Double peakVoltage) {
        this.peakVoltage = peakVoltage;
    }

    public Double getPeakCurrent() {
        return peakCurrent;
    }
    public void setPeakCurrent(Double peakCurrent) {
        this.peakCurrent = peakCurrent;
    }
    
    public Date getUpdatedAt() {
        return updatedAt;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    
    

}