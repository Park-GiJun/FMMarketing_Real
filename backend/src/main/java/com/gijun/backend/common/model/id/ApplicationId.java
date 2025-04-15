package com.gijun.backend.common.model.id;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ApplicationId implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Column(name = "application_id", nullable = false, length = 36)
    private String id;
    
    public static ApplicationId of(String id) {
        return new ApplicationId(id);
    }
    
    public static ApplicationId generate() {
        return new ApplicationId(UUID.randomUUID().toString());
    }
    
    @Override
    public String toString() {
        return id;
    }
}
