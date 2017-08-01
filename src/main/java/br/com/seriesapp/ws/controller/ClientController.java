package br.com.seriesapp.ws.controller;

import java.util.List;

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
import br.com.seriesapp.ws.service.ClientService;

@RestController
public class ClientController {

	@Autowired
	private ClientService clientService;
	
	// Endpoints

	@RequestMapping(method = RequestMethod.POST, value = "/clients", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Client> registerClient(@RequestBody Client client) {

		Client registeredClient = this.clientService.register(client);
		if (registeredClient == null) 
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		
		return new ResponseEntity<Client>(registeredClient, HttpStatus.CREATED);
	}
	
//	@RequestMapping(method = RequestMethod.GET, value = "/clients", produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<List<Client>> searchAllClients() {
//		List<Client> searchedClients = this.clientService.searchAll();
//		return new ResponseEntity<List<Client>>(searchedClients, HttpStatus.OK);
//	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/clients/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Client> getClientById(@PathVariable Integer id) {
		Client searcheredClient = this.clientService.findById(id);
			if(searcheredClient != null) {
				return new ResponseEntity<Client>(searcheredClient, HttpStatus.OK);
			}
			return new ResponseEntity<Client>(HttpStatus.NOT_FOUND);
	}

}
