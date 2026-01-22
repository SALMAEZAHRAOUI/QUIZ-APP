import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true // Si le backend utilise des cookies (peut être ignoré pour JWT)
    });
  }

  // Inscription
  async register(username: string, password: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/register', { username, password });
      return response.data;
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error.response?.data || { message: 'Erreur inconnue' };
    }
  }

  // Connexion
  async login(username: string, password: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/login', { username, password });
      return response.data; // Retourne l'utilisateur et le token JWT
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      throw error.response?.data || { message: 'Erreur inconnue' };
    }
  }

  // Accès à une page protégée
  async getSecret(token: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get('/secret', {
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token JWT dans les en-têtes
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Erreur lors de l\'accès à la page protégée:', error);
      throw error.response?.data || { message: 'Erreur inconnue' };
    }
  }
}
