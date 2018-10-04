package br.com.seriesapp.ws.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.seriesapp.ws.model.Serie;
import br.com.seriesapp.ws.repository.SerieRepository;

@Service
public class SerieService implements CrudService<Serie, Integer> {

	@Autowired
	private SerieRepository serieRepository;

	public Serie register(Serie serie) {
		return this.serieRepository.save(serie);
	}

	@Override
	public Serie update(Serie object) {
		return this.serieRepository.save(object);
	}

	public Serie remove(Serie serie) {
		if (this.serieRepository.exists(serie.getId()))
			this.serieRepository.delete(serie);
		return serie;
	}

	@Override
	public boolean removeById(Integer id) {
		if (this.serieRepository.exists(id)) {
			this.serieRepository.delete(id);
			return true;
		}
		return false;
	}

	public Serie getSerieById(Integer id) {
		return this.serieRepository.findOne(id);
	}

	@Override
	public Serie getById(Integer id) {
		return this.serieRepository.findOne(id);
	}

}