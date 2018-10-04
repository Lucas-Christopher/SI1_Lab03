package br.com.seriesapp.ws.controller;

import java.io.Serializable;
import java.util.List;

public interface CrudService<T, ID extends Serializable> {

    List<T> findAll();

    T getById(ID id);

    T create(T t);

    T update(T t);

    boolean removeById(ID id);

}