package br.com.seriesapp.ws.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Serie {
	
	@Id
	@GeneratedValue
	private Integer id;

	private String title;
	
	private String plot;
	
	private String post;
	
	private String imdbID;
	
	private String imdbRating;

	private String myRating;

	private String lastEpisode;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPlot() {
		return plot;
	}

	public void setPlot(String plot) {
		this.plot = plot;
	}

	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	public String getImdbID() {
		return imdbID;
	}

	public void setImdbID(String imdbID) {
		this.imdbID = imdbID;
	}

	public String getImdbRating() {
		return imdbRating;
	}

	public void setImdbRating(String imdbRating) {
		this.imdbRating = imdbRating;
	}

	public String getMyRating() {
		return myRating;
	}

	public void setMyRating(String myRating) {
		this.myRating = myRating;
	}

	public String getLastEpisode() {
		return lastEpisode;
	}

	public void setLastEpisode(String lastEpisode) {
		this.lastEpisode = lastEpisode;
	}
	
}
