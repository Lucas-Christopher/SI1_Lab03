package br.com.seriesapp.ws.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.seriesapp.ws.model.Client;
import br.com.seriesapp.ws.repository.ClientRepository;

@Service
public class ClientService {

	@Autowired
	private ClientRepository clientRepository;

	public Client register(Client client) {
		List<Client> users = this.searchAll();
		for (Client user : users) {
			if (user.getEmail().equals(client.getEmail()))
				return null;
		}
		return this.clientRepository.save(client);
	}
	
	public Client update(Client client) {
		return this.clientRepository.save(client);
	}

	public List<Client> searchAll() {
		return this.clientRepository.findAll();
	}

	public Client findById(Integer id) {
		Client searcheredClient = this.clientRepository.findOne(id);
		
		if (searcheredClient != null)
			return searcheredClient;
		else
			return new Client();
	}
	
	public Client findByEmail(Client client) {
		List<Client> clients = this.searchAll();
		for (Client customer : clients) {
			if (customer.getEmail().equals(client.getEmail()))
				return customer;
		}
		return new Client();
		
	}

	public Client authenticateClient(Client client) {
		Client searcheredClient = this.findByEmail(client);

		if (searcheredClient != null && searcheredClient.getEmail().equals(client.getEmail())
				&& searcheredClient.getPassword().equals(client.getPassword())) {
			return searcheredClient;
		}
		return new Client();
	}

}
