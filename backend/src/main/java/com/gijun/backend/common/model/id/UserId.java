package com.gijun.backend.common.model.id;

import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class UserId extends BaseId {
    private static final String DOMAIN_TYPE = "USER";
    
    public static UserId generate() {
        return (UserId) generateId(DOMAIN_TYPE);
    }
}
