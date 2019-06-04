import { Injectable } from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouterEvent
} from "@angular/router";
import {
  RouteInformation,
  FlowState,
  NavigationChangeType
} from "./flow-manager.models";
import { Observable, BehaviorSubject } from "rxjs";
import { FlowName, PageName } from "../routes/route-names";

@Injectable({
  providedIn: "root"
})
export class FlowManagerService {
  protected _flowState = new BehaviorSubject<FlowState>(null);
  protected previousRoute: string;

  public flowState = this._flowState.asObservable();

  constructor(protected router: Router) {
    router.events.subscribe(routerEvent => {
      if (routerEvent instanceof RouterEvent) {
        const flowState: FlowState = {
          next: {
            flow: this.getFlowName(routerEvent.url),
            page: this.getPageName(routerEvent.url)
          },
          previous: null,
          changeType: this.getChangeType(this.previousRoute, routerEvent.url),
          routerEvent: routerEvent
        };

        if (this.previousRoute) {
          flowState.previous = {
            flow: this.getFlowName(this.previousRoute),
            page: this.getPageName(this.previousRoute)
          };
        }

        this._flowState.next(flowState);

        if (routerEvent instanceof NavigationEnd) {
          // Navigation is starting, save the current route
          this.previousRoute = routerEvent.url;
        }
      }
    });
  }

  protected getFlowName(url: string): FlowName {
    try {
      const pageName = FlowName[url.split("/")[1]];
      return pageName;
    } catch (err) {
      return FlowName.noflow;
    }
  }

  protected getPageName(url: string): PageName {
    try {
      const pageName = PageName[url.split("/")[2]];
      return pageName;
    } catch (err) {
      return PageName.nopage;
    }
  }

  protected getChangeType(
    previousUrl: string,
    nextUrl: string
  ): NavigationChangeType {
    // First time coming in
    if (!previousUrl) {
      return NavigationChangeType.EnteringFlow;
    }

    // Flow Change
    const previousFlow = this.getFlowName(previousUrl);
    const nextFlow = this.getFlowName(nextUrl);
    if (previousFlow !== nextFlow) {
      return NavigationChangeType.FlowChange;
    }

    // Page Change
    const previousPage = this.getPageName(previousUrl);
    const nextPage = this.getPageName(nextUrl);
    if (previousPage !== nextPage) {
      return NavigationChangeType.PageChange;
    }
  }
}
