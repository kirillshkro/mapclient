import {PlacemarkService} from "./placemark.service";
import {TestBed} from "@angular/core/testing";

let service: PlacemarkService;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [PlacemarkService]
  });
  service = TestBed.inject(PlacemarkService);
});

it('s')
