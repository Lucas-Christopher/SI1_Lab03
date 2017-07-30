package br.com.seriesapp.ws.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.seriesapp.ws.model.Serie;
import br.com.seriesapp.ws.repository.SerieRepository;

@Service
public class SerieService {
	
	@Autowired
	private SerieRepository serieRepository;
	
	public Serie register(Serie serie) {
		return this.serieRepository.save(serie);
	}
	
	public Serie remove(Serie serie) {
		if (this.serieRepository.exists(serie.getId()))
			this.serieRepository.delete(serie);
		return serie;
	}
	
	public Serie getSerieById(Integer id) {
		return this.serieRepository.findOne(id);
	}
	
	public List<Serie> searchAll() {
		return this.serieRepository.findAll();
	}
	
}