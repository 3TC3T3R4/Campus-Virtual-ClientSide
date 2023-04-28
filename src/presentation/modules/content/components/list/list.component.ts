import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteContentUseCase } from 'src/bussiness/useCases/content/commands/delete-content.usecase';
import { ContentModel } from 'src/domain/models/content/content.model';

@Component({
  selector: 'sofka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() contents: ContentModel[];
  contentID!: string;
  index!: any;

  constructor(
    private router: Router,
    private deleteContent: DeleteContentUseCase,
    private toastr: ToastrService
  ) {
    this.contents = [];
  }

  modal(contentID: string, i: any): void {
    this.contentID = contentID;
    this.index = i;
  }

  detail(idCourse: string, type: number) {
    this.router.navigate([`/dashboard/content/detail/${idCourse}/${type}`]);
  }

  update(idCourse: string) {
    this.router.navigate([`/dashboard/content/update/${idCourse}`]);
  }

  delete(idCourse: string, index: number) {
    console.log(idCourse);
    this.deleteContent.execute(idCourse).subscribe({
      next: (result) => {
        this.toastr.success('Content successfully deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      },
      error: (err) => {
        this.toastr.warning('Content was no deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      },
      complete: () => {
        this.contents.splice(index, 1);
      },
    });
  }
}
