package com.gijun.backend.common.model.id;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ApplicationId extends BaseId {
    private static final String DOMAIN_TYPE = "APPLICATION";
    
    public static ApplicationId generate() {
        return (ApplicationId) generateId(DOMAIN_TYPE);
    }
}
