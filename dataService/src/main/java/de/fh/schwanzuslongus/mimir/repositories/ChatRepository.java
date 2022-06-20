package de.fh.schwanzuslongus.mimir.repositories;

import de.fh.schwanzuslongus.mimir.model.Chat;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Lukas Szimtenings on 6/20/2022.
 */
public interface ChatRepository extends CrudRepository<Chat, Integer>
{
}
