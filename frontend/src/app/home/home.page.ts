import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api-mobile.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  posts$: Observable<any[]>;
  comments: any[] = [];
  authors: string[] = []; // Puedes cargar los autores desde tu API si es necesario
  selectedAuthor: string | null = null;

  constructor(private apiService: ApiService) {
    this.posts$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.posts$ = this.apiService.getPosts();
    this.apiService.getComments().subscribe((comments: any[]) => {
      this.comments = comments;
    });
  }

  getCommentsForPost(postId: number): any[] {
    return this.comments.filter(comment => comment.postId === postId);
  }

  deletePost(postId: number): void {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este post?');
    if (confirmDelete) {
      this.apiService.deletePost(postId).subscribe(() => {
        // Actualizar la lista de posts después de la eliminación si es necesario
        this.posts$ = this.apiService.getPosts();
      });
    }
  }
}
