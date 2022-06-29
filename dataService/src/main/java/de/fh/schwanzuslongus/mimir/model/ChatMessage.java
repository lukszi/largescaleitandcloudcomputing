package de.fh.schwanzuslongus.mimir.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

/**
 * Created by Lukas Szimtenings on 6/20/2022.
 */
@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(schema = "chat_service", name = "chat_message")
public class ChatMessage
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "message")
    private String message;
    @Column(name = "chat_id", nullable = false, insertable = false, updatable = false)
    private int chatId;
    @Basic
    @Column(name = "time")
    private Timestamp time;
    @Column(name = "author_id", insertable = false, updatable = false)
    private Integer authorId;
    @ManyToOne
    @JoinColumn(name = "chat_id", referencedColumnName = "id", nullable = false)
    private Chat chat;
    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private User author;
    
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatMessage that = (ChatMessage) o;
        return id == that.id && chatId == that.chatId && Objects.equals(message, that.message) && Objects.equals(time, that.time) && Objects.equals(authorId, that.authorId);
    }
    
    @Override
    public int hashCode()
    {
        return Objects.hash(id, message, chatId, time, authorId);
    }
}
