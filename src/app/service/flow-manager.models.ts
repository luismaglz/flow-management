import { Router, Event } from "@angular/router";
import { FlowName, PageName } from "../routes/route-names";

export enum NavigationChangeType {
  PageChange = "pageChange",
  FlowChange = "flowChange",
  EnteringFlow = "enteringFlow"
}

export interface RouteInformation {
  flow: FlowName;
  page: PageName;
}

export interface FlowState {
  previous: RouteInformation | null;
  next: RouteInformation | null;
  changeType: NavigationChangeType;
  routerEvent: Event;
}
