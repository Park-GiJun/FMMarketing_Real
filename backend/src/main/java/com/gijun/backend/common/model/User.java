package com.gijun.backend.common.model;

import com.gijun.backend.common.model.id.UserId;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseTimeEntity {

    @EmbeddedId
    private UserId id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    private String profileImage;
    
    @Column(nullable = false)
    private boolean active = true;
    
    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = UserId.generate();
        }
    }
}
