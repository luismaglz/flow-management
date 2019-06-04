import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { Route, RouterModule } from "@angular/router";
import { BookingFlowComponent } from "./flows/booking-flow/booking-flow.component";
import { CheckinFlowComponent } from "./flows/checkin-flow/checkin-flow.component";
import { FlowName, PageName } from "./routes/route-names";
import { FlightSelectComponent } from "./components/flight-select/flight-select.component";
import { PassengersComponent } from "./components/passengers/passengers.component";

export const routes: Route[] = [
  {
    path: "",
    component: BookingFlowComponent
  },
  {
    path: FlowName.booking.toString(),
    component: BookingFlowComponent,
    children: [
      {
        path: PageName.select.toString(),
        component: FlightSelectComponent
      },
      {
        path: PageName.passengers,
        component: PassengersComponent
      }
    ]
  },
  {
    path: FlowName.checkin.toString(),
    component: CheckinFlowComponent,
    children: [
      {
        path: PageName.select.toString(),
        component: FlightSelectComponent
      },
      {
        path: PageName.passengers,
        component: PassengersComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
      anchorScrolling: "enabled",
      enableTracing: false
    }),
    NgxJsonViewerModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    BookingFlowComponent,
    CheckinFlowComponent,
    FlightSelectComponent,
    PassengersComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
