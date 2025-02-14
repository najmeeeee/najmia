package com.marian.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.marian.project.model.ResetToken;

public interface ResetTokenRepository extends JpaRepository<ResetToken, Long> {
    Optional<ResetToken> findByToken(String token);

    void deleteByToken(String token);
}
