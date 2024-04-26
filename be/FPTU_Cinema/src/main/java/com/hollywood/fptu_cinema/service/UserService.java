package com.hollywood.fptu_cinema.service;

import com.hollywood.fptu_cinema.model.Role;
import com.hollywood.fptu_cinema.model.User;
import com.hollywood.fptu_cinema.repository.RoleRepository;
import com.hollywood.fptu_cinema.repository.UserRepository;
import com.hollywood.fptu_cinema.util.JwtTokenProvider;
import com.hollywood.fptu_cinema.util.Util;
import com.hollywood.fptu_cinema.viewModel.UserDTO;
import com.hollywood.fptu_cinema.viewModel.UserRegistrationDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider,
                       EmailService emailService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.emailService = emailService;
        this.roleRepository = roleRepository;
    }

    public User login(String identifier, String password) {
        return userRepository.findByPhoneOrEmail(identifier, identifier)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElseThrow(() -> new AccessDeniedException("Invalid login credentials"));
    }

    public void logout(HttpServletRequest request) {
        String token = getTokenFromHeader(request);
        if (token != null && !jwtTokenProvider.isTokenBlacklisted(token)) {
            jwtTokenProvider.invalidateToken(token);
        }
    }

    private String getTokenFromHeader(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        return authHeader != null && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = findByUserName(username);
        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("The old password is incorrect.");
        }
    }

    public void initiateResetPassword(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            sendResetPasswordLink(user, email);
        } else {
            throw new IllegalArgumentException("Email address not found.");
        }
    }

    private void sendResetPasswordLink(User user, String email) {
        String token = jwtTokenProvider.generateResetToken(user.getUserName());
        String resetPasswordLink = "http://localhost:3000/api/auth/resetPassword?token=" + token;
        try {
            emailService.sendResetPasswordEmail(email, resetPasswordLink);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void resetPassword(String token, String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match.");
        }
        if (!jwtTokenProvider.validateResetToken(token)) {
            throw new IllegalArgumentException("Invalid or expired reset token.");
        }
        String username = jwtTokenProvider.extractUserId(token);
        User user = findByUserName(username);
        if (!isAllowedToResetPassword(user)) {
            throw new AccessDeniedException("You do not have permission to reset password.");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private boolean isAllowedToResetPassword(User user) {
        List<Integer> allowedRoleIds = List.of(1, 2);
        return allowedRoleIds.contains(user.getRole().getId());
    }

    public UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getAvatar(),
                user.getUserName(),
                user.getEmail(),
                user.getAddress(),
                user.getGender(),
                user.getBirthdate(),
                user.getPhone(),
                user.getStatus(),
                user.getRole()
        );
    }

    public List<UserDTO> getAllUsersWithPermission() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer currentUserId = Integer.parseInt(authentication.getName());
        User currentUser = findUserById(currentUserId);
        boolean isAdmin = "ADMIN".equals(currentUser.getRole().getRoleName());
        boolean isStaff = "STAFF".equals(currentUser.getRole().getRoleName());

        return userRepository.findAll().stream()
                .filter(user -> !(isAdmin && user.getRole().getId().equals(1)) &&
                        !(isStaff && (user.getRole().getId().equals(1) ||
                                user.getRole().getId().equals(3))))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void register(UserRegistrationDTO registrationDto) {
        validateUser(registrationDto.getEmail(), registrationDto.getUserName());
        int newRoleId = getNewRoleId();
        Role role = findRoleById(newRoleId);
        User newUser = createNewUser(registrationDto, role);
        convertToDTO(userRepository.save(newUser));
    }

    private void validateUser(String email, String username) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already in use.");
        }
        if (userRepository.findByUserName(username).isPresent()) {
            throw new IllegalArgumentException("Username already taken.");
        }
    }

    private Role findRoleById(int roleId) {
        return roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalStateException("Role not found."));
    }

    private User createNewUser(UserRegistrationDTO registrationDto, Role role) {
        User newUser = new User();
        newUser.setEmail(registrationDto.getEmail());
        newUser.setUserName(registrationDto.getUserName());
        newUser.setAddress(registrationDto.getAddress());
        newUser.setGender(registrationDto.getGender());
        newUser.setBirthdate(registrationDto.getBirthdate());
        newUser.setPhone(registrationDto.getPhone());
        newUser.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        newUser.setRole(role);
        newUser.setStatus(1);
        return newUser;
    }

    private static int getNewRoleId() {
        final int MEMBER_ROLE_ID = 2;
        final int STAFF_ROLE_ID = 3;
        int newRoleId = MEMBER_ROLE_ID;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String currentRoleName = ((UserDetails) principal).getAuthorities().iterator().next().getAuthority();
            if ("ADMIN".equals(currentRoleName)) {
                newRoleId = STAFF_ROLE_ID;
            } else if ("STAFF".equals(currentRoleName) || "MEMBER".equals(currentRoleName)) {
                throw new IllegalStateException("Staff and Member users are not allowed to create new users.");
            }
        }
        return newRoleId;
    }

    public void deleteUser(Integer userId) {
        User user = findUserById(userId);
        user.setStatus(0);
        userRepository.save(user);
    }

    public User findUserById(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
    }

    public void updateUser(Integer userId, UserDTO userDTO) {
        String currentUserIdString = Util.currentUser();
        assert currentUserIdString != null;
        Integer currentUserId = Integer.parseInt(currentUserIdString);

        User currentUser = findUserById(currentUserId);
        User userToUpdate = findUserById(userId);

        boolean isSelfUpdate = currentUser.getId().equals(userId);
        boolean isAdmin = "ADMIN".equals(currentUser.getRole().getRoleName());

        if (isAdmin || isSelfUpdate) {
            updateUserFromDTO(userToUpdate, userDTO);
            userRepository.save(userToUpdate);
        } else {
            throw new AccessDeniedException("You do not have permission to update this profile.");
        }
    }

    private void updateUserFromDTO(User user, UserDTO userDTO) {
        if (userDTO.getAvatar() != null) {
            user.setAvatar(userDTO.getAvatar());
        }
        if (userDTO.getUserName() != null) {
            user.setUserName(userDTO.getUserName());
        }
        if (userDTO.getEmail() != null) {
            user.setEmail(userDTO.getEmail());
        }
        if (userDTO.getAddress() != null) {
            user.setAddress(userDTO.getAddress());
        }
        if (userDTO.getGender() != null) {
            user.setGender(userDTO.getGender());
        }
        if (userDTO.getBirthdate() != null) {
            user.setBirthdate(userDTO.getBirthdate());
        }
        if (userDTO.getPhone() != null) {
            user.setPhone(userDTO.getPhone());
        }
    }

    public User findByUserName(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
    }

    public UserDTO getUserProfile(Integer userId) {
        User user = findUserById(userId);
        return convertToDTO(user);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = ((UserDetails) authentication.getPrincipal()).getUsername();
        return findByUserName(currentUsername);
    }
}