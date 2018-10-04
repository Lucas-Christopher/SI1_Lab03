package br.com.seriesapp.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.seriesapp.ws.model.Serie;

@Repository
public interface SerieRepository extends JpaRepository<Serie, Integer> {

}
