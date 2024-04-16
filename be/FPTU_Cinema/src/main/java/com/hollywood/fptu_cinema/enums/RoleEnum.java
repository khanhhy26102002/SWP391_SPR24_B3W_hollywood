package com.hollywood.fptu_cinema.enums;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum RoleEnum {
    ROLE_ADMIN,
    ROLE_MEMBER,
    ROLE_STAFF;

    public GrantedAuthority asGrantedAuthority() {
        return new SimpleGrantedAuthority(this.name());
    }
}
