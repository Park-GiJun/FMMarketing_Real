package com.gijun.backend.common.model.id;

import jakarta.persistence.Embeddable;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class BaseId implements Serializable {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
    
    protected String id;
    
    public static BaseId generateId(String domainType) {
        String timestamp = LocalDateTime.now().format(DATE_FORMAT);
        String uniqueId = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        String fullId = domainType + "_" + timestamp + "_" + uniqueId;
        
        // Instantiate the appropriate subclass
        try {
            if ("USER".equals(domainType)) {
                return new UserId(fullId);
            } else if ("CAMPAIGN".equals(domainType)) {
                return new com.gijun.backend.admin.model.id.CampaignId(fullId);
            } else if ("APPLICATION".equals(domainType)) {
                return new com.gijun.backend.blogger.model.id.ApplicationId(fullId);
            } else {
                throw new IllegalArgumentException("Unknown domain type: " + domainType);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to create ID for domain: " + domainType, e);
        }
    }
    
    public static <T extends BaseId> T of(Class<T> clazz, String id) {
        try {
            T instance = clazz.getDeclaredConstructor().newInstance();
            instance.setId(id);
            return instance;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create ID instance for: " + clazz.getName(), e);
        }
    }
}
