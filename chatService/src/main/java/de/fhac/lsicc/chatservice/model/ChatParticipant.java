package de.fhac.lsicc.chatservice.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Objects;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "chat_participant", schema = "chat", catalog = "chat")
public class ChatParticipant
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "participation_id")
    private int participationId;
    @Basic
    @Column(name = "user_id")
    private int userId;
    @ManyToOne
    @JoinColumn(name = "chat_id", referencedColumnName = "id", nullable = false)
    private Chat chat;
    
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatParticipant that = (ChatParticipant) o;
        return participationId == that.participationId && userId == that.userId && chat.getId() == that.chat.getId();
    }
    
    @Override
    public int hashCode()
    {
        return Objects.hash(participationId, userId, chat.getId());
    }
}
