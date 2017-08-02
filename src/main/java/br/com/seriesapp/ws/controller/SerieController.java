package br.com.seriesapp.ws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.seriesapp.ws.model.Client;
import br.com.seriesapp.ws.model.Serie;
import br.com.seriesapp.ws.service.ClientService;
import br.com.seriesapp.ws.service.SerieService;

@RestController
@RequestMapping("/client")
public class SerieController {
	
	@Autowired
	private ClientService clientService;
	@Autowired
	private SerieService serieService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/profile/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Serie> registerProfileSerie(@RequestBody Serie serie, @PathVariable("id") Integer idClient) {
		
		Serie serieRegistered = this.serieService.register(serie);
		Client searchedClient = this.clientService.findById(idClient);
		
		searchedClient.addSerieToProfile(serieRegistered);
		this.clientService.update(searchedClient); // update
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/watchlist/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Serie> registerWatchlistSerie(@RequestBody Serie serie, @PathVariable("id") Integer idClient) {
		
		Serie serieRegistered = this.serieService.register(serie);
		Client searchedClient = this.clientService.findById(idClient);
		
		searchedClient.addSerieToWatchlist(serieRegistered);
		this.clientService.update(searchedClient); // update
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/removeFromProfile/{idClient}/{imdbIdSerie}")
	public ResponseEntity<String> removeProfileSerie(@PathVariable Integer idClient, @PathVariable String imdbIdSerie) {
		
		Client searcheredClient = this.clientService.findById(idClient);
		searcheredClient.removeProfileSerie(imdbIdSerie);
		
		this.clientService.update(searcheredClient); // update
		return new ResponseEntity<>("Serie removed successfully!", HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/removeFromWatchlist/{idClient}/{imdbIdSerie}")
	public ResponseEntity<String> removeWatchlistSerie(@PathVariable Integer idClient, @PathVariable String imdbIdSerie) {
		
		Client searcheredClient = this.clientService.findById(idClient);
		searcheredClient.removeWatchlistSerie(imdbIdSerie);
		
		this.clientService.update(searcheredClient); // update
		return new ResponseEntity<>("Serie removed successfully!", HttpStatus.OK);
	}

}
