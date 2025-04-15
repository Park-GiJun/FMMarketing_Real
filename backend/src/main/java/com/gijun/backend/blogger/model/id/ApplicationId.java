package com.gijun.backend.blogger.model.id;

import com.gijun.backend.common.model.id.BaseId;
import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class ApplicationId extends BaseId {
    private static final String DOMAIN_TYPE = "APPLICATION";
    
    public static ApplicationId generate() {
        return (ApplicationId) generateId(DOMAIN_TYPE);
    }
}
