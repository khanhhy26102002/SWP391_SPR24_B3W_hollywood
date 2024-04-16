package com.hollywood.fptu_cinema.config.security;

import com.hollywood.fptu_cinema.model.Role;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.RoleRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

public class CustomUserDetails implements UserDetails {


    private final RoleRepository roleRepository;

    private final User user;

    public CustomUserDetails(RoleRepository roleRepository, User user) {
        this.roleRepository = roleRepository;
        this.user = user;
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.getStatus() == 1;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Optional<Role> role = roleRepository.findById(user.getRoleId());
        if (role.isPresent()) {
            GrantedAuthority authority = new SimpleGrantedAuthority(role.get().getRoleName());
            return Collections.singletonList(authority);
        } else {
            return Collections.emptyList();
        }
    }
}