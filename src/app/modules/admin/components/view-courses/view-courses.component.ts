import {Component, OnInit, ViewChild} from '@angular/core';
import {CourseService} from '../../../../global-services/course/course.service';
import {UserType} from '../../../../global-models/UserType';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../../global-models/User';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BackendService} from '../../../../global-services/backend/backend.service';
import {Course} from '../../../../global-models/Course';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'area'];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private backend: BackendService
  ) {

  }

  ngOnInit() {
    this.backend.getAll('courses').then(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  viewDetails(row){
    this.router.navigate(['admin', 'details', 'course', row._id], {state: {route: this.router.url}});
  }
}
