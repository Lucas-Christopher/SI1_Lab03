package br.com.seriesapp.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.seriesapp.ws.model.Serie;

public interface SerieRepository extends JpaRepository<Serie, Integer> {

}
