package de.fh.schwanzuslongus.mimir.model;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

/**
 * Created by Lukas Szimtenings on 6/20/2022.
 */
@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(schema = "chat_service", name="chat")
public class Chat
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "chat_name")
    private String chatName;
    
    @OneToMany(mappedBy = "chat")
    @ToString.Exclude
    private Collection<ChatMessage> messages;
    
    @OneToMany(mappedBy = "chat")
    @ToString.Exclude
    private Collection<ChatParticipant> chatParticipants;
    
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chat chat = (Chat) o;
        return id == chat.id && Objects.equals(chatName, chat.chatName);
    }
    
    @Override
    public int hashCode()
    {
        return Objects.hash(id, chatName);
    }
}
