package com.gijun.backend.common.model.key;

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
public class CampaignId implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Column(name = "campaign_id", nullable = false, length = 36)
    private String id;
    
    public static CampaignId of(String id) {
        return new CampaignId(id);
    }
    
    public static CampaignId generate() {
        return new CampaignId(UUID.randomUUID().toString());
    }
    
    @Override
    public String toString() {
        return id;
    }
}
