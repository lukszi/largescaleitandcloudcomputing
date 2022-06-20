package de.fh.schwanzuslongus.mimir.model;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

/**
 * Created by Lukas Szimtenings on 6/20/2022.
 */
@Entity
@IdClass(ChatParticipantPK.class)
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ChatParticipant
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_id", nullable = false, insertable = false, updatable = false)
    private int userId;
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "chat_id", nullable = false, insertable = false, updatable = false)
    private int chatId;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false, referencedColumnName = "id")
    private User user;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "chat_id", nullable = false, insertable = false, updatable = false, referencedColumnName = "id")
    private Chat chat;
    
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatParticipant that = (ChatParticipant) o;
        return userId == that.userId && chatId == that.chatId;
    }
    
    @Override
    public int hashCode()
    {
        return Objects.hash(userId, chatId);
    }

}
