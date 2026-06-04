import { Component } from "@angular/core";

import type {
  HeaderProps,
  NotificationBarProps,
  ReviewCustomerProps,
} from "@shared-angular/types/props";

import HeaderComponent from "@shared-angular/components/headers/header/header.component";
import ReviewCustomerComponent from "@shared-angular/components/reviews/review-customer/review-customer.component";
import NotificationBarComponent from "@shared-angular/components/notifications/notification-bar/notification-bar.component";

@Component({
  selector: "app-test",
  standalone: true,
  imports: [HeaderComponent, ReviewCustomerComponent, NotificationBarComponent],
  templateUrl: "./app-test.component.html",
  styleUrl: "./app-test.component.css",
})
class AppTestComponent {
  private componentName = "app-test";

  public headerProps: HeaderProps = {
    name: "DShop",
    className: "header-test",
    onClickMenu: this.onHeaderDefaultClickMenu.bind(this),
    onClickTitle: this.onHeaderDefaultClickTitle.bind(this),
    onSubmitSearch: this.onHeaderDefaultSubmitSearch.bind(this),
    onClickSearch: this.onHeaderDefaultClickSearch.bind(this),
    onClickCart: this.onHeaderDefaultClickCart.bind(this),
  };

  public reviewCustomerProps: ReviewCustomerProps = {
    name: "Sarah M.",
    description:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    maxStars: 5,
    valueStars: 5,
    className: "review-customer-test",
  };

  public notificationBarProps: NotificationBarProps = {
    className: "notification-bar-test",
    onClose: this.onNotificationBarDefaultClose.bind(this),
  };

  onHeaderDefaultClickMenu(e: MouseEvent): void {
    console.log("Executed in shared_angular - ClickMenu: ", this.componentName, e);
  }

  onHeaderDefaultClickTitle(e: MouseEvent): void {
    console.log("Executed in shared_angular - ClickTitle: ", this.componentName, e);
  }

  onHeaderDefaultSubmitSearch(inputValue: string): void {
    console.log("Executed in shared_angular - SubmitSearch: ", this.componentName, inputValue);
  }

  onHeaderDefaultClickSearch(e: MouseEvent): void {
    console.log("Executed in shared_angular - ClickSearch: ", this.componentName, e);
  }

  onHeaderDefaultClickCart(e: MouseEvent): void {
    console.log("Executed in shared_angular - ClickCart: ", this.componentName, e);
  }

  onNotificationBarDefaultClose(): void {
    console.log("Executed in shared_angular - onNotificationBarDefaultClose: ", this.componentName);
  }
}

export default AppTestComponent;
