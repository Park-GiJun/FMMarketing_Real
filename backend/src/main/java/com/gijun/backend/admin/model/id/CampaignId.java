package com.gijun.backend.admin.model.id;

import com.gijun.backend.common.model.id.BaseId;
import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class CampaignId extends BaseId {
    private static final String DOMAIN_TYPE = "CAMPAIGN";
    
    public static CampaignId generate() {
        return (CampaignId) generateId(DOMAIN_TYPE);
    }
}
