// Angular
import { Component, OnInit } from "@angular/core";

// Models
import { Entry } from "../shared/entry.model";

// Services
import { EntryService } from "../shared/entry.service";

@Component({
  selector: "app-entry-list",
  templateUrl: "./entry-list.component.html",
  styleUrls: ["./entry-list.component.css"],
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit() {
    this.entryService.getAll().subscribe(
      (res) => (this.entries = res.sort((a, b) => b.id - a.id)),
      (err) => alert("Erro ao carregar a lista")
    );
  }

  deleteEntry(entry) {
    const mustDelete = confirm("Deseja realmente excluir este item?");

    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () =>
          (this.entries = this.entries.filter((element) => element != entry)),
        () => alert("Erro ao tentar excluir!")
      );
    }
  }
}
