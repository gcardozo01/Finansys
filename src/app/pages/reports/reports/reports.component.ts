// Angular
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

// Model
import { Category } from "../../categories/shared/category.model";
import { Entry } from "../../entries/shared/entry.model";

// Services
import { CategoryService } from "../../categories/shared/category.service";
import { EntryService } from "../../entries/shared/entry.service";

// Libs
import currencyFormatter from "currency-formatter";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  categories: Category[] = [];
  entries: Entry[] = [];

  chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  @ViewChild("month") month: ElementRef = null;
  @ViewChild("year") year: ElementRef = null;

  constructor(
    private categoryService: CategoryService,
    private entryService: EntryService
  ) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe((res) => (this.categories = res));
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year) {
      alert("Você precisa selecionar o Mês e o Ano para gerar os relatórios");
    } else {
      this.entryService
        .getByMonthAndYear(month, year)
        .subscribe(this.setValues.bind(this));
    }
  }

  // Private methods
  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let revenueTotal = 0;
    let expenseTotal = 0;

    this.entries.forEach((e) => {
      if (e.type == "revenue") {
        revenueTotal += currencyFormatter.unformat(e.amount, { code: "BRL" });
      } else {
        expenseTotal += currencyFormatter.unformat(e.amount, { code: "BRL" });
      }
    });

    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: "BRL" });
    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: "BRL" });
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, {
      code: "BRL",
    });
  }

  private setChartData() {
    this.revenueChartData = this.getChartData(
      "revenue",
      "Gráfico de Receitas",
      "#9CCC65"
    );
    this.expenseChartData = this.getChartData(
      "expense",
      "Gráfico de Despesas",
      "#e03131"
    );
  }

  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];

    this.categories.forEach((category) => {
      // filtering entries by category and type
      const filteredEntries = this.entries.filter(
        (entry) => entry.categoryId == category.id && entry.type == entryType
      );

      // if found entries, then sum entries amount and add to chartData
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) =>
            total + currencyFormatter.unformat(entry.amount, { code: "BRL" }),
          0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount,
        });
      }
    });

    return {
      labels: chartData.map((e) => e.categoryName),
      datasets: [
        {
          label: title,
          backgroundColor: color,
          data: chartData.map((e) => e.totalAmount),
        },
      ],
    };
  }
}
