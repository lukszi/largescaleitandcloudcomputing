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
@Table(schema = "chat_service", name="user")
public class User
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    
    @Basic
    @Column(name = "name")
    private String name;
    
    @OneToMany(mappedBy = "author")
    @ToString.Exclude
    private Collection<ChatMessage> messages;
    
    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Collection<ChatParticipant> chatParticipants;
    
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id && Objects.equals(name, user.name);
    }
    
    @Override
    public int hashCode()
    {
        return Objects.hash(id, name);
    }
}
