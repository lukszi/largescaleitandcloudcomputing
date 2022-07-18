package de.fhac.lsicc.chatservice.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Chat
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "chat_name")
    private String chatName;
    @OneToMany(mappedBy = "chat")
    @ToString.Exclude
    private Collection<ChatParticipant> chatParticipants = new ArrayList<>();
    
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
