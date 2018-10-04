package br.com.seriesapp.ws.service;

import java.io.Serializable;

public interface CrudService<T, ID extends Serializable> {

	T register(T object);

	T getById(ID id);

	T update(T object);

	boolean removeById(ID id);

}
