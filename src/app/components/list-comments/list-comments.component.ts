import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Comment } from 'src/app/models/comment/comment';


@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css'],
})
export class ListCommentsComponent implements OnInit {
  comments: Comment[]=[];
  loading: boolean;

  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.commentService.commentList(id).subscribe((data) => {
      this.comments = data;
      this.loading = false;
    });
  }
}
