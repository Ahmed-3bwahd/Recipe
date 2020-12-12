import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSorageService } from '../shared/data-storage.service';
import { AuthserviceService } from '../auth/authservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuth = false;
  userSub = new Subscription;

  constructor(
    private datastorage: DataSorageService,
    private authser: AuthserviceService,
    private router: Router) {}

  ngOnInit(){
    this.userSub = this.authser.user.subscribe(user =>{this.isAuth = !!user})
  }
  onSaveData(){
    this.datastorage.storageData();
  }

  onFetchData(){
    this.datastorage.fetchData().subscribe();
  }

  onlogout(){
    this.authser.logout()
  }
  ngOnDestroy(){this.userSub.unsubscribe()}
}
