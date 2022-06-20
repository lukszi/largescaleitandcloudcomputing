package de.fh.schwanzuslongus.mimir.repositories;

import de.fh.schwanzuslongus.mimir.model.ChatParticipant;
import de.fh.schwanzuslongus.mimir.model.ChatParticipantPK;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Lukas Szimtenings on 6/20/2022.
 */
public interface ChatParticipantRepository extends CrudRepository<ChatParticipant, ChatParticipantPK>
{
}
