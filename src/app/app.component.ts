import { Component } from "@angular/core";
import { FlowManagerService } from "./service/flow-manager.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";

  constructor(public flowManager: FlowManagerService) {
    // this.flowManager.flowState.subscribe(flowState => console.log(flowState));
  }
}
