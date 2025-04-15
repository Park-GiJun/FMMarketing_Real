package com.gijun.backend.common.model.id;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class BaseId implements Serializable {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
    
    @Column(name = "id")
    private String id;
    
    @Column(name = "domain_type")
    private String domainType;
    
    public static BaseId generateId(String domainType) {
        String timestamp = LocalDateTime.now().format(DATE_FORMAT);
        String uniqueId = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        return BaseId.builder()
                .id(domainType + "_" + timestamp + "_" + uniqueId)
                .domainType(domainType)
                .build();
    }
}
