package de.fh.schwanzuslongus.mimir.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

/**
 * Created by Lukas Szimtenings on 6/20/2022.
 */
@Data
public class ChatParticipantPK implements Serializable
{
    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @Column(name = "chat_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatId;
    
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatParticipantPK that = (ChatParticipantPK) o;
        return userId == that.userId && chatId == that.chatId;
    }
    
    @Override
    public int hashCode()
    {
        return Objects.hash(userId, chatId);
    }
}
