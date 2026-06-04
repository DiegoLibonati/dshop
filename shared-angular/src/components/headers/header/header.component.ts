import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

import type {
  FormSearchProps,
  SharedComponentModule,
  SvgCartShoppingProps,
  SvgHamburgerMenuProps,
  SvgSearchProps,
} from "shared-core/sdk";
import type { HeaderProps } from "@shared-angular/types/props";
import type { LangHeader } from "@shared-angular/types/constants";

import SharedMfeComponent from "@shared-angular/components/shared-mfe/shared-mfe.component";

import { lang } from "@shared-angular/constants/lang.constants";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, SharedMfeComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
class HeaderComponent {
  @Input() name: HeaderProps["name"] = "";
  @Input() isFixed: HeaderProps["isFixed"] = false;
  @Input() language: HeaderProps["language"] = "en";
  @Input() className: HeaderProps["className"] = "";

  @Input() onClickMenu: HeaderProps["onClickMenu"] = this.onDefaultClickMenu.bind(this);
  @Input() onClickTitle: HeaderProps["onClickTitle"] = this.onDefaultClickTitle.bind(this);
  @Input() onSubmitSearch: HeaderProps["onSubmitSearch"] = this.onDefaultSubmitSearch.bind(this);
  @Input() onClickSearch: HeaderProps["onClickSearch"] = this.onDefaultClickSearch.bind(this);
  @Input() onClickCart: HeaderProps["onClickCart"] = this.onDefaultClickCart.bind(this);

  private componentName = "header";

  public texts: LangHeader = lang[this.language!].header;

  public loadSvgHamburgerMenu = (): Promise<SharedComponentModule<SvgHamburgerMenuProps>> =>
    import("shared-core/sdk").then((m) => m.SvgHamburgerMenuModule);
  public loadSvgSearch = (): Promise<SharedComponentModule<SvgSearchProps>> =>
    import("shared-core/sdk").then((m) => m.SvgSearchModule);
  public loadSvgCartShopping = (): Promise<SharedComponentModule<SvgCartShoppingProps>> =>
    import("shared-core/sdk").then((m) => m.SvgCartShoppingModule);
  public loadFormSearch = (): Promise<SharedComponentModule<FormSearchProps>> =>
    import("shared-core/sdk").then((m) => m.FormSearchModule);

  onDefaultClickMenu(e: MouseEvent): void {
    console.log("Executed in shared_angular - ClickMenu: ", this.componentName, e);
  }

  onDefaultClickTitle(e: MouseEvent): void {
    console.log("Executed in shared_angular - ClickTitle: ", this.componentName, e);
  }

  onDefaultSubmitSearch(inputValue: string): void {
    console.log("Executed in shared_angular - SubmitSearch: ", this.componentName, inputValue);
  }

  onDefaultClickSearch(e: MouseEvent): void {
    console.log("Executed in shared_angular - ClickSearch: ", this.componentName, e);
  }

  onDefaultClickCart(e: MouseEvent): void {
    console.log("Executed in shared_angular - ClickCart: ", this.componentName, e);
  }
}

export default HeaderComponent;
