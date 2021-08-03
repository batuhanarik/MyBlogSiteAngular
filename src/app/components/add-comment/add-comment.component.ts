import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment/comment.service';
import { MyvalidationService } from 'src/app/services/myValidation/myvalidation.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  commentForm: FormGroup;
  success: boolean;
  info:string;

  @Output() Reload: EventEmitter<string> = new EventEmitter();

  constructor(public commentService: CommentService,private activatedRoute: ActivatedRoute,public myValidationService: MyvalidationService) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      name : new FormControl("",Validators.required),
      contentMain : new FormControl("",Validators.required),
      articleId : new FormControl("")
    });
  }

  get getControls(){
    return this.commentForm.controls;
  }

  onSubmit() {
    if(this.commentForm.valid){
      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

      this.commentForm.controls.articleId.setValue(id);

      this.commentService.addComment(this.commentForm.value).subscribe(data => {
        this.success = true;
        this.info = "Yorumunuz başarıyla eklenmiştir.";
        this.Reload.emit();
      },error=>{
        this.success = false;
        this.info = "Bir hata oluştu, lütfen daha sonra tekrar deneyin.";
      });

    }
  }

}
