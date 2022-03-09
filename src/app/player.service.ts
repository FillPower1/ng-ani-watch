import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs'
import { environment } from '../environments/environment';

export interface SearchParams {
  title: string,
  searchByKodik: boolean
}

export type Results = {
  date: string
  end: string
  episodes: Array<unknown>
  title?: string
  title_orig?: string
  worldart_link?: string
  type?: string
  year?: string
  info: {
    actors: string
    age: string
    alter: string
    country: string
    description: string
    director: string
    genre: string
    orig: string
    poster: string
    premiere: string
    rating: {
      rating_kp: string
      vote_num_kp: string
      rating_imdb: string
      vote_num_imdb: string
    }
    rus: string
    slogan?: string
    time: string
    year: string
  }
  kinopoisk_id: string
  last_episode: string
  last_season: string
  link: string
  max_qual: string
  quality: string
  serial: string
  trailer: string
  translation: any
}

export interface TitleApiParams {
  results?: Results[]
  error?: string
  api?: string
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  static bazon = 'https://bazon.cc/api/search'
  static kodik = 'https://kodikapi.com/search'
  api: string = 'bazon'

  private aniListSource = new BehaviorSubject<TitleApiParams>({})
  aniList = this.aniListSource.asObservable()

  private currentTitleSource = new BehaviorSubject<Partial<Results>>({})
  currentTitle = this.currentTitleSource.asObservable()

  constructor(private http: HttpClient) {}

  emitAniList(error: unknown, items: Partial<TitleApiParams>) {
    if (error) {
      this.aniListSource.error(error)
    } else {
      this.aniListSource.next(items)
    }
  }

  emitCurrentTitle(title: Results) {
    this.currentTitleSource.next(title)
  }

  search({ title, searchByKodik }: SearchParams) {
    const api = searchByKodik ? 'kodik' : 'bazon'
    const token = environment[api]
    const url = PlayerService[api]

    return this.http.get<TitleApiParams>(url, {
      params: {
        token,
        title
      }
    })
    .pipe(
      map((response) => ({
        ...response,
        api,
      }))
    )
  }
}
