import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService, Product } from './app-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client-angular');
  private appService = inject(AppService);

  fetchProducts(): void {
    this.appService.getProducts().subscribe({
      next: (products: Product[]) => {
        console.log('Products received:', products);
        products.forEach(product => {
          console.log(`- ${product.name}: $${product.price}`);
        });
      },
      error: (error) => console.error('Error fetching products:', error)
    });
  }
}
