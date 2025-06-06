import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    ButtonsModule,
    FormsModule,
    TimeagoModule,
    RouterLink,
    PaginationModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  messageService = inject(MessageService);
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;
  isOutbox = this.container === 'Outbox';

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(
      this.pageNumber,
      this.pageSize,
      this.container
    );
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: (_) => {
        this.messageService.paginatedResult.update((prev) => {
          if (prev && prev.items) {
            prev.items.splice(
              prev.items.findIndex((m) => m.id === id),
              1
            );
            return prev;
          }
          return prev;
        });
      },
    });
  }

  getRoute(message: Message) {
    if (this.container === 'Outbox')
      return `/members/${message.recipientUsername}`;
    else return `/members/${message.senderUsername}`;
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
}
