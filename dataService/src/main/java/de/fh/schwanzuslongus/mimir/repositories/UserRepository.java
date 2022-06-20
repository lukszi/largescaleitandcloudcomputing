package de.fh.schwanzuslongus.mimir.repositories;

import de.fh.schwanzuslongus.mimir.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Lukas Szimtenings on 6/20/2022.
 */
public interface UserRepository extends CrudRepository<User, Integer>
{
}
